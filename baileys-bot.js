const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const express = require('express');
const fs = require('fs');
const path = require('path');
const keywordCategories = require('./keywords');

const app = express();
const port = process.env.PORT || 3000;
let botReady = false;

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;

        const separatorIndex = trimmed.indexOf('=');
        if (separatorIndex === -1) return;

        const key = trimmed.slice(0, separatorIndex).trim();
        const value = trimmed.slice(separatorIndex + 1).trim();
        if (!process.env[key]) {
            process.env[key] = value;
        }
    });
}

app.get('/', (req, res) => {
    res.send('Bot is running!');
});

app.get('/health', (req, res) => {
    res.json({
        status: botReady ? 'ready' : 'starting',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.get('/healthz', (req, res) => {
    const statusCode = botReady ? 200 : 503;
    res.status(statusCode).json({
        status: botReady ? 'ok' : 'starting',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`✅ Keep-alive server running on port ${port}`);
});

function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getDisplayName(text, sender) {
    const nameMatch = text.match(/my name is ([a-zA-Z][a-zA-Z0-9 ]{1,20})|i am ([a-zA-Z][a-zA-Z0-9 ]{1,20})|i'm ([a-zA-Z][a-zA-Z0-9 ]{1,20})/i);
    if (nameMatch) {
        return (nameMatch[1] || nameMatch[2] || nameMatch[3] || 'my padi').trim();
    }

    if (sender && sender.includes('@')) {
        const localPart = sender.split('@')[0];
        if (localPart && localPart !== 'status') {
            return localPart;
        }
    }

    return 'my padi';
}

function getReplyForMessage(text, userName = 'my padi') {
    const normalizedText = normalizeText(text || '');
    if (!normalizedText) {
        return '👋 I dey here o! Tell me wetin dey your mind.';
    }

    for (const [, category] of Object.entries(keywordCategories)) {
        const matched = category.keywords.some((keyword) => {
            const normalizedKeyword = normalizeText(keyword);
            return normalizedKeyword && normalizedText.includes(normalizedKeyword);
        });

        if (matched) {
            return category.response(userName);
        }
    }

    return `🤖 *I dey here!*

I no quite understand, but no worry.

Try these:
• Hello - Greet me
• Gist - Tell me something
• Joke - Make you laugh
• Advice - Give you guidance
• Help - See all options

Wetin you want talk about? 🗣️`;
}

async function startBot() {
    botReady = false;
    console.log('🚀 Starting bot...');

    // Delete old session if it exists
    if (fs.existsSync('auth_info')) {
        console.log('🗑️ Deleting old session...');
        fs.rmSync('auth_info', { recursive: true, force: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState('auth_info');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
    });

    let codeRequested = false;

    const requestPairingCode = async () => {
        if (codeRequested || sock.authState?.creds?.registered) return;
        codeRequested = true;

        console.log('🔐 Requesting WhatsApp pairing code...');

        try {
            const phoneNumber = process.env.PHONE_NUMBER;
            if (!phoneNumber) {
                console.log('⚠️ PHONE_NUMBER not set! Add it to your environment and restart the bot.');
                return;
            }

            const cleanNumber = phoneNumber.replace(/\s/g, '');
            console.log(`📱 Requesting code for ${cleanNumber}...`);
            const code = await sock.requestPairingCode(cleanNumber);
            console.log(`\n✅✅✅ PAIRING CODE: ${code} ✅✅✅`);
            console.log('🔑 Enter this code in WhatsApp -> Settings -> Linked Devices -> Link with phone number\n');
        } catch (error) {
            console.log('⚠️ Unable to request pairing code:', error.message);
            codeRequested = false;
        }
    };

    setTimeout(() => {
        requestPairingCode().catch((error) => {
            console.log('⚠️ Pairing request failed:', error.message);
            codeRequested = false;
        });
    }, 4000);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        console.log('📡 Connection status:', connection || 'connecting...');

        if (connection === 'open') {
            botReady = true;
            console.log('✅ WhatsApp connection is ready');
        }

        if (connection === 'open' && !codeRequested) {
            await requestPairingCode();
        }

        if (qr) {
            console.log('📱 QR code detected, but pairing-code login is enabled. Skipping QR login.');
        }

        if (connection === 'close') {
            botReady = false;
            const shouldReconnect = (lastDisconnect?.error instanceof Boom)?.output?.statusCode !== 401;
            console.log('Connection closed, reconnecting...');
            codeRequested = false;
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
            const displayName = getDisplayName(text, sender);
            const reply = getReplyForMessage(text, displayName);
            await sock.sendMessage(sender, { text: reply });
        }
    });
}

startBot().catch((error) => {
    console.error('❌ Bot startup failed:', error);
    setTimeout(() => startBot(), 10000);
});