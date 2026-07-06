"# WhatsApp Bot

A simple WhatsApp bot built with Baileys that uses pairing-code login instead of QR code scanning.

## Features
- Pairing-code authentication for WhatsApp login
- Keyword-based replies for casual conversations
- Local environment configuration with .env
- Lightweight Express server for keep-alive on deployment

## Requirements
- Node.js 18 or newer
- npm

## Installation
1. Open the project folder
2. Run:
   ```bash
   npm install
   ```

## Configuration
Create a .env file in the project root with at least:

```env
PHONE_NUMBER=2348103741405
PORT=3000
```

## Run the bot
Use one of these commands:

```bash
node baileys-bot.js
```

or

```bash
node index.js
```

## Notes
- The bot will request a pairing code from WhatsApp and prompt you to enter it in the terminal.
- Auth state is stored in the session folder for persistence.
- If you want to restart the bot later, use the provided batch files or run the command again.
" 
