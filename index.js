require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

// ==================== CONFIGURATION ====================
const CONFIG = {
    businessName: process.env.BUSINESS_NAME || 'My Business',
    autoReplyEnabled: process.env.AUTO_REPLY_ENABLED === 'true',
    businessHours: {
        start: process.env.BUSINESS_HOURS_START || '09:00',
        end: process.env.BUSINESS_HOURS_END || '18:00'
    },
    adminNumbers: process.env.ADMIN_NUMBERS ? process.env.ADMIN_NUMBERS.split(',') : []
};

// ==================== DATABASE ====================
const DB = {
    users: new Map(),
    orders: new Map(),
    products: [
        { id: 'P1', name: 'Premium T-Shirt', price: 499, category: 'Clothing', inStock: true },
        { id: 'P2', name: 'Wireless Headphones', price: 1299, category: 'Electronics', inStock: true },
        { id: 'P3', name: 'Coffee Mug Set', price: 299, category: 'Home', inStock: true },
        { id: 'P4', name: 'Smart Watch', price: 2499, category: 'Electronics', inStock: false },
        { id: 'P5', name: 'Backpack', price: 899, category: 'Accessories', inStock: true }
    ],
    conversations: new Map()
};

// ==================== FIND CHROME ====================
function getChromePath() {
    const possiblePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
    ];
    
    for (const path of possiblePaths) {
        if (fs.existsSync(path)) {
            console.log(`✅ Found Chrome at: ${path}`);
            return path;
        }
    }
    return null;
}

const chromePath = getChromePath();

// ==================== CREATE CLIENT ====================
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: path.join(__dirname, 'session')
    }),
    puppeteer: {
        headless: true,
        ...(chromePath && { executablePath: chromePath }),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    }
});

// ==================== QR CODE ====================
client.on('qr', (qr) => {
    console.log('📱 SCAN THIS QR CODE:');
    qrcode.generate(qr, { small: true });
});

// ==================== READY ====================
client.on('ready', () => {
    console.log(`✅ ${CONFIG.businessName} Bot is ONLINE!`);
    console.log(`📊 Auto-Reply: ${CONFIG.autoReplyEnabled ? 'ON' : 'OFF'}`);
    console.log(`⏰ Hours: ${CONFIG.businessHours.start} - ${CONFIG.businessHours.end}`);
    console.log(`👥 Admins: ${CONFIG.adminNumbers.join(', ')}`);
});

// ==================== MESSAGE HANDLER ====================
client.on('message', async (message) => {
    try {
        // Ignore messages from the bot itself
        if (message.fromMe) return;

        // Get sender info
        const sender = message.from;
        const senderName = message._data.notifyName || 'Unknown';
        const isGroup = sender.includes('@g.us');
        const phoneNumber = isGroup ? 'GROUP' : sender.replace('@c.us', '');
        const messageBody = message.body?.trim() || '';

        if (!messageBody) {
            console.log(`⏭️ Empty message from ${senderName}`);
            return;
        }

        // Log the message
        if (isGroup) {
            console.log(`📩 GROUP (${sender}): ${senderName}: ${messageBody.substring(0, 30)}`);
        } else {
            console.log(`📩 Private from ${senderName} (${phoneNumber}): ${messageBody.substring(0, 30)}`);
        }

        // ========== PROCESS COMMANDS (WORKS IN BOTH PRIVATE AND GROUPS) ==========
        const lowerMsg = messageBody.toLowerCase();

        // Check if the message mentions the bot (for groups)
        const isMentioned = messageBody.includes('@') || lowerMsg.includes('bot') || lowerMsg.includes('help') || lowerMsg.includes('product');

        // For groups, only reply if mentioned or using specific commands
        if (isGroup) {
            // Check if message is a command or mentions the bot
            const isCommand = lowerMsg.includes('help') || 
                              lowerMsg.includes('product') || 
                              lowerMsg.includes('hello') || 
                              lowerMsg.includes('hi') || 
                              lowerMsg.includes('menu') ||
                              lowerMsg.includes('order') ||
                              lowerMsg.includes('support') ||
                              lowerMsg.includes('admin');

            if (!isCommand) {
                console.log(`⏭️ Group message ignored (not a command): ${messageBody.substring(0, 20)}`);
                return;
            }
        }

        // ========== AUTO-REPLY LOGIC ==========
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            await client.sendMessage(sender, `👋 Hello ${senderName}! Welcome to ${CONFIG.businessName}!`);
        } else if (lowerMsg.includes('help') || lowerMsg.includes('menu')) {
            await client.sendMessage(sender, 
                `🤖 *Help Menu*\n\n` +
                `1️⃣ Type *Products* - View catalog\n` +
                `2️⃣ Type *Order Status* - Check orders\n` +
                `3️⃣ Type *Support* - Contact us\n` +
                `4️⃣ Type *Admin* - Admin commands\n\n` +
                `💡 For groups, mention @bot or use these commands!`
            );
        } else if (lowerMsg.includes('product') || lowerMsg.includes('catalog')) {
            let catalog = `🛍️ *Product Catalog*\n\n`;
            DB.products.forEach(p => {
                catalog += `📦 ${p.name} - ₹${p.price} ${p.inStock ? '✅' : '❌'}\n`;
            });
            await client.sendMessage(sender, catalog);
        } else if (lowerMsg.includes('order status') || lowerMsg.includes('track')) {
            await client.sendMessage(sender, 
                `📦 *Order Status*\n\n` +
                `To check your order, reply with:\n` +
                `*Status [Order ID]*\n` +
                `Example: Status ORD-123456`
            );
        } else if (lowerMsg.includes('support') || lowerMsg.includes('contact')) {
            await client.sendMessage(sender,
                `📞 *Customer Support*\n\n` +
                `📧 Email: support@${CONFIG.businessName.toLowerCase().replace(/ /g, '')}.com\n` +
                `📱 Phone: +91-9876543210\n` +
                `⏰ Hours: ${CONFIG.businessHours.start} - ${CONFIG.businessHours.end}\n\n` +
                `💬 Reply here for quick assistance!`
            );
        } else if (lowerMsg.includes('admin') && CONFIG.adminNumbers.includes(phoneNumber)) {
            await client.sendMessage(sender, 
                `👑 *Admin Dashboard*\n\n` +
                `Status: ONLINE ✅\n` +
                `Users: ${DB.users.size}\n` +
                `Orders: ${DB.orders.size}\n` +
                `Products: ${DB.products.length}\n\n` +
                `Admin commands coming soon!`
            );
        } else {
            // Default reply for both private and groups
            await client.sendMessage(sender, 
                `🤖 I'm here to help!\n\n` +
                `Type *HELP* to see all options.\n` +
                `Or just tell me what you need! 😊`
            );
        }

        console.log(`✅ Replied to ${senderName}${isGroup ? ' (Group)' : ''}`);

    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// ==================== LOAD KEYWORDS ====================
const KEYWORDS = require('./keywords.js');

// ==================== UPDATE MESSAGE HANDLER ====================
client.on('message', async (message) => {
    try {
        if (message.fromMe) return;

        const sender = message.from;
        const senderName = message._data.notifyName || 'Unknown';
        const isGroup = sender.includes('@g.us');
        const phoneNumber = isGroup ? 'GROUP' : sender.replace('@c.us', '');
        const messageBody = message.body?.trim() || '';

        if (!messageBody) {
            console.log(`⏭️ Empty message from ${senderName}`);
            return;
        }

        const lowerMsg = messageBody.toLowerCase();

        // Log the message
        if (isGroup) {
            console.log(`📩 GROUP: ${senderName}: ${messageBody.substring(0, 30)}`);
        } else {
            console.log(`📩 Private from ${senderName}: ${messageBody.substring(0, 30)}`);
        }

        // ========== CHECK KEYWORDS ==========
        let foundKeyword = false;
        for (const [category, data] of Object.entries(KEYWORDS)) {
            if (data.keywords.some(keyword => lowerMsg.includes(keyword))) {
                const response = data.response(senderName);
                await client.sendMessage(sender, response);
                console.log(`📤 ${category} reply sent to ${senderName}`);
                foundKeyword = true;
                break;
            }
        }

        // ========== IF NO KEYWORD MATCHED ==========
        if (!foundKeyword) {
            await client.sendMessage(sender, 
                `🤔 *Sorry, I no understand o!* 🇳🇬\n\n` +
                `Try these keywords:\n` +
                `• *Products* - See wetin we get\n` +
                `• *Help* - See all options\n` +
                `• *Contact* - How to reach us\n\n` +
                `💡 *Type HELP for more!*`
            );
        }

    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// ==================== DISCONNECT ====================
client.on('disconnected', (reason) => {
    console.log('❌ Disconnected:', reason);
    console.log('🔄 Reconnecting in 5 seconds...');
    setTimeout(() => client.initialize(), 5000);
});

// ==================== START ====================
console.log(`🚀 Starting ${CONFIG.businessName} WhatsApp Bot...`);
console.log(`📱 Initializing...`);

client.initialize();