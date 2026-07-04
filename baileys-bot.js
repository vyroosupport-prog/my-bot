const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const express = require('express');

// ==================== KEEP-ALIVE SERVER ====================
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('My Life Bot is running!');
});

app.listen(port, () => {
    console.log(`✅ Keep-alive server running on port ${port}`);
});

// ==================== WHATSAPP BOT ====================
async function startBot() {
    console.log('🚀 Starting Life Style Bot...');
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    const sock = makeWASocket({
        auth: state
    });

    let pairingCodeRequested = false;

    sock.ev.on('connection.update', async (update) => {
        console.log('📡 Connection update:', Object.keys(update));
        
        const { connection, lastDisconnect, qr } = update;
        
        // Show QR code when received
        if (qr) {
            console.log('📱 QR CODE RECEIVED!');
            console.log('🔗 Copy this URL into your browser:');
            console.log(qr);
            console.log('📱 Or scan the QR code below:');
            // QR code will print automatically via Baileys
        }
        
        if (connection === 'open' && !pairingCodeRequested) {
            pairingCodeRequested = true;
            console.log('✅ Connection is open! Requesting pairing code...');
            
            try {
                const phoneNumber = process.env.PHONE_NUMBER;
                if (phoneNumber) {
                    console.log(`📱 Requesting pairing code for ${phoneNumber}...`);
                    const code = await sock.requestPairingCode(phoneNumber);
                    console.log(`✅ PAIRING CODE: ${code}`);
                    console.log(`🔑 Enter this code in WhatsApp -> Settings -> Linked Devices -> Link with phone number`);
                } else {
                    console.log('⚠️ No PHONE_NUMBER found.');
                }
            } catch (error) {
                console.log('⚠️ Could not request pairing code:', error.message);
            }
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== 401;
            console.log('Connection closed, reconnecting...');
            if (shouldReconnect) {
                setTimeout(startBot, 5000);
            }
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.key.fromMe && msg.message) {
            const sender = msg.key.remoteJid;
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
            console.log(`📩 Message from ${sender}: ${text}`);

            const lowerText = text.toLowerCase();
            let reply = '';

            // Greetings
            if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
                reply = `👋 Hello! How you dey?\n\nI dey here to gist with you. How your day go so far? 😊`;
            }
            // How are you
            else if (lowerText.includes('how are you') || lowerText.includes('how you dey')) {
                reply = `I dey fine o! 🙌 Thanks for asking.\n\nHow you sef? Any gist for me today? 😄`;
            }
            // Gist
            else if (lowerText.includes('gist') || lowerText.includes('story') || lowerText.includes('tell me something')) {
                reply = `📖 *Gist of the day*\n\nYou know, life na like market. Sometimes e sweet, sometimes e sour. But the important thing na to keep moving forward.\n\nWetin dey your mind today? Make we talk am! 🗣️`;
            }
            // Advice
            else if (lowerText.includes('advice') || lowerText.includes('suggest') || lowerText.includes('help')) {
                reply = `💡 *My advice for you*\n\nNo matter wetin you dey face today, remember say:\n• You be warrior 💪\n• This moment go pass ⏳\n• You no dey alone 🤝\n\nKeep your head up! 😊`;
            }
            // Joke
            else if (lowerText.includes('joke') || lowerText.includes('funny') || lowerText.includes('make me laugh')) {
                const jokes = [
                    `😂 *Joke 1*\n\nWhy Nigerian man no dey use calculator?\nBecause e know say na only God fit count all the wahala for life! 😂`,
                    `😂 *Joke 2*\n\nWoman: "Honey, if I drop 10 naira, you go see am?"\nMan: "Yes."\nWoman: "If I drop 100 naira, you go see am?"\nMan: "Yes."\nWoman: "If I drop 1000 naira, you go see am?"\nMan: "Yes."\nWoman: "So wetin dey your eye?"\nMan: "Na God dey my eye!" 😂`
                ];
                reply = jokes[Math.floor(Math.random() * jokes.length)];
            }
            // Quote
            else if (lowerText.includes('quote') || lowerText.includes('inspire') || lowerText.includes('wisdom')) {
                const quotes = [
                    `🌟 *Quote of the day*\n\n"Na the journey wey you no see, but you must walk am - that one na faith."\n\nKeep believing! 💪`,
                    `🌟 *Quote of the day*\n\n"Life na like bicycle - to keep balance, you must keep moving."\n\nNo stop moving forward! 🚴‍♂️`
                ];
                reply = quotes[Math.floor(Math.random() * quotes.length)];
            }
            // Default
            else {
                const defaultReplies = [
                    `🤖 *I dey here!*\n\nI no quite understand, but no worry.\n\nTry these:\n• Hello - Greet me\n• Gist - Tell me something\n• Joke - Make you laugh\n• Advice - Give you guidance\n\nWetin you want talk about? 🗣️`,
                    `🤖 *Life Style Bot*\n\nI dey here to listen and gist with you!\n\nYou fit ask me for:\n• Gist 🗣️\n• Advice 💡\n• Joke 😂\n• Quote 🌟\n\nJust type wetin dey your mind! 😊`
                ];
                reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
            }

            await sock.sendMessage(sender, { text: reply });
        }
    });
}

startBot();