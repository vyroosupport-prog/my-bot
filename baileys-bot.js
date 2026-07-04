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

    sock.ev.on('connection.update', async (update) => {
    console.log('📡 Connection update:', Object.keys(update));
    
    const { connection, lastDisconnect, qr } = update;
    
    if (connection === 'open') {
        console.log('✅ Life Style Bot is ONLINE!');
    }

    if (qr) {
        console.log('📱 QR CODE RECEIVED!');
        console.log('🔗 Copy this URL into your browser:');
        console.log(qr);
    }

    // Only request pairing code when connection is 'open' (fully ready)
    if (connection === 'open') {
        try {
            const phoneNumber = process.env.PHONE_NUMBER;
            if (phoneNumber) {
                console.log(`📱 Requesting pairing code for ${phoneNumber}...`);
                const code = await sock.requestPairingCode(phoneNumber);
                console.log(`✅ PAIRING CODE: ${code}`);
                console.log(`🔑 Enter this code in WhatsApp -> Settings -> Linked Devices -> Link with phone number`);
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

            // ==================== LIFE STYLE REPLIES ====================
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
                reply = `💡 *My advice for you*\n\nNo matter wetin you dey face today, remember say:\n• You be warrior 💪\n• This moment go pass ⏳\n• You no dey alone 🤝\n\nKeep your head up! Any other thing you want talk about? 😊`;
            }
            // Joke
            else if (lowerText.includes('joke') || lowerText.includes('funny') || lowerText.includes('make me laugh')) {
                const jokes = [
                    `😂 *Joke 1*\n\nWhy Nigerian man no dey use calculator?\nBecause e know say na only God fit count all the wahala for life! 😂`,
                    `😂 *Joke 2*\n\nWoman: "Honey, if I drop 10 naira, you go see am?"\nMan: "Yes."\nWoman: "If I drop 100 naira, you go see am?"\nMan: "Yes."\nWoman: "If I drop 1000 naira, you go see am?"\nMan: "Yes."\nWoman: "So wetin dey your eye?"\nMan: "Na God dey my eye!" 😂`,
                    `😂 *Joke 3*\n\nPastor: "Make una pray for the person wey no get money."\nMember: "But Pastor, na you!"\nPastor: "Shhh! Na humility! Your prayer dey work well well!" 😂`
                ];
                reply = jokes[Math.floor(Math.random() * jokes.length)];
            }
            // Quote
            else if (lowerText.includes('quote') || lowerText.includes('inspire') || lowerText.includes('wisdom')) {
                const quotes = [
                    `🌟 *Quote of the day*\n\n"Na the journey wey you no see, but you must walk am - that one na faith."\n\nKeep believing! 💪`,
                    `🌟 *Quote of the day*\n\n"Life na like bicycle - to keep balance, you must keep moving."\n\nNo stop moving forward! 🚴‍♂️`,
                    `🌟 *Quote of the day*\n\n"Na today wey you get, no be tomorrow you go get. Use today well."\n\nMake the most of today! ⏰`
                ];
                reply = quotes[Math.floor(Math.random() * quotes.length)];
            }
            // Motivation
            else if (lowerText.includes('motivate') || lowerText.includes('encourage') || lowerText.includes('inspire')) {
                reply = `💪 *Motivation for you*\n\nYou be star! ⭐\n\nNo matter wetin dey happen, remember say:\n• Every champion start small\n• Every journey start with one step\n• Your story no finish yet!\n\nYou get what e take! 🚀`;
            }
            // Gratitude
            else if (lowerText.includes('thank') || lowerText.includes('grateful') || lowerText.includes('bless')) {
                reply = `🙏 *Gratitude*\n\nNa good thing to thank God. When you dey grateful, more blessings go come.\n\nWetin you thank God for today? Tell me! 😊`;
            }
            // Prayer
            else if (lowerText.includes('pray') || lowerText.includes('prayer') || lowerText.includes('pray for me')) {
                reply = `🙏 *I go pray for you*\n\nGod wey see you, e go answer you.\n\nMay you find peace, joy, and favor today.\n\nYou dey loved! ❤️`;
            }
            // Food
            else if (lowerText.includes('food') || lowerText.includes('eat') || lowerText.includes('hungry')) {
                reply = `🍲 *Food talk!*\n\nWetin you go chop today?\n\nRice and stew? Jollof? Amala? Egusi?\n\nAbeg no make me hungry o! 😩\n\nWetin dey your pot? Tell me! 😋`;
            }
            // Family
            else if (lowerText.includes('family') || lowerText.includes('mother') || lowerText.includes('father')) {
                reply = `👨‍👩‍👧‍👦 *Family na everything!*\n\nNo matter wetin happen, family dey.\n\nCall your people today. Tell them you love them.\n\nAny family gist? Make I hear am! 🗣️`;
            }
            // Love
            else if (lowerText.includes('love') || lowerText.includes('girlfriend') || lowerText.includes('boyfriend') || lowerText.includes('relationship')) {
                reply = `❤️ *Love talk!*\n\nLove na sweet thing o! 🥰\n\nIf you get love, hold am well. If you no get, e go come.\n\nTell me about your love life! Na safe space. 😊`;
            }
            // Money
            else if (lowerText.includes('money') || lowerText.includes('cash') || lowerText.includes('sapa') || lowerText.includes('broke')) {
                reply = `💰 *Money matter!*\n\nE no easy but e go come.\n\nSmall money better than no money. Save something every month.\n\nHow money dey your side? Make we talk am! 💪`;
            }
            // Work
            else if (lowerText.includes('work') || lowerText.includes('job') || lowerText.includes('hustle')) {
                reply = `💼 *Hustle dey!*\n\nYour hustle today na your luxury tomorrow.\n\nNo compare yourself to other people. Run your race.\n\nHow work dey? Tell me wetin dey happen! 🚀`;
            }
            // School
            else if (lowerText.includes('school') || lowerText.includes('exam') || lowerText.includes('student')) {
                reply = `📚 *School dey stress, but e go end!*\n\nRead small every day. No wait until exam before you read.\n\nYou fit do am! 💪\n\nWetin dey happen for school? Share the gist! 😊`;
            }
            // Travel
            else if (lowerText.includes('travel') || lowerText.includes('trip') || lowerText.includes('go')) {
                reply = `✈️ *Travel gist!*\n\nTravel na sweet thing o! 🏖️\n\nWhere you dey go? Lagos? Abuja? Abroad?\n\nMake sure you plan well and enjoy every moment! 🚀`;
            }
            // Health
            else if (lowerText.includes('health') || lowerText.includes('sick') || lowerText.includes('hospital')) {
                reply = `🏥 *Health na wealth!*\n\nNo joke with your body o!\n\nDrink water, rest well, eat good food.\n\nIf you sick, go hospital. Take care of yourself! 💪`;
            }
            // Thanks/Bye
            else if (lowerText.includes('bye') || lowerText.includes('thanks')) {
                reply = `👋 *Bye for now!*\n\nThanks for chatting with me.\n\nCome back anytime you want to gist!\n\nHave a blessed day! 🌟`;
            }
            // Default
            else {
                const defaultReplies = [
                    `🤖 *I dey here!*\n\nI no quite understand, but no worry.\n\nTry these:\n• Hello - Greet me\n• Gist - Tell me something\n• Joke - Make you laugh\n• Advice - Give you guidance\n• Help - See all options\n\nWetin you want talk about? 🗣️`,
                    
                    `🤖 *Life Style Bot*\n\nI dey here to listen and gist with you!\n\nYou fit ask me for:\n• Gist 🗣️\n• Advice 💡\n• Joke 😂\n• Quote 🌟\n• Motivation 💪\n• Prayer 🙏\n\nJust type wetin dey your mind! 😊`
                ];
                reply = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
            }

            // Send the reply
            await sock.sendMessage(sender, { text: reply });
        }
    });
}

startBot();