// ============================================
// NORMAL LIFE BOT - PIDGIN + ENGLISH MIX
// Wetin you dey talk, I go answer!
// ============================================

module.exports = {

    // ==================== GREETINGS ====================
    greetings: {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'good day', 'good night', 'howdy', 'sup', 'yo', 'how far', 'whats up', 'wassup', 'what is up', 'whatsup', 'how you dey', 'how you dey do', 'how are you', 'how are you doing', 'how body', 'body dey', 'how life', 'morning', 'evening', 'afternoon', 'na wa o', 'mtchew', 'sapa', 'abi', 'shey', 'oya', 'jo', 'abeg', 'please', 'i dey fine', 'i am fine', 'i dey okay', 'i am okay', 'i dey good', 'i am good', 'how you dey today', 'how your day', 'how una dey', 'how everything', 'how thing dey', 'how you do', 'good one', 'welcome', 'welcome back', 'long time', 'seen you', 'how market'],
        response: (userName) => {
            const greetings = [
                `👋 *Hello ${userName}!* How you dey today?\n\nI dey here o! 🙌 Na your life bot I be. I fit help you with many things.\n\n💬 *Wetin I fit help you with:*\n• Gist and talk (Chat)\n• Advice wey sweet (Advice)\n• Jokes wey funny (Jokes)\n• Quote of the day (Quotes)\n• Remember wetin you do (Reminders)\n• Write small notes (Notes)\n• Just dey talk if you bored!\n\nTell me wetin dey your mind! 🗣️`,
                `🤗 *${userName}, I dey here o!* Wetin dey your mind today?\n\nIf you wan gist, laugh, get advice, or just talk, I dey ready. No wahala, I go hold you company. 😊`,
                `🌞 *Good day ${userName}!* How body?\n\nI dey here to listen, gist, and help you with anything wey dey your mind. You fit talk to me like real padi. 🗣️`
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
    },

    // ==================== GIST / CHAT / TALK ====================
    gist: {
        keywords: ['gist', 'chat', 'talk', 'discuss', 'conversation', 'story', 'tell me', 'tell me something', 'whats new', 'what dey happen', 'wetin dey', 'what is happening', 'what is going on', 'what happen', 'what happened', 'wetin happen', 'how things', 'life', 'how life', 'how life dey', 'how far', 'abi', 'shey', 'na so', 'mtchew', 'sapa', 'wahala', 'God when', 'guy', 'my guy', 'sister', 'bro', 'brother', 'naija', 'lagos', 'abuja', 'yoruba', 'igbo', 'hausa', 'ehn ehn', 'chai', 'abi o', 'shey o', 'na wa', 'i want to talk', 'i wan talk', 'i need to talk', 'i dey vex', 'i dey bored', 'i no know what to do', 'i need someone to talk to', 'i wan gist', 'i wan yarn', 'i wan confide', 'i need a listening ear', 'i need person to talk to'],
        response: (userName) => {
            const responses = [
                `🗣️ *Gist dey o!*\n\n${userName}, life na journey. Today fit be like yesterday, but tomorrow go better!\n\nWetin dey your mind? Abeg share am make we talk. Na here we dey gist like real padi.\n\n💬 Talk to me about anything o - happiness, wahala, love, work, family, or just wetin you eat today! 😂\n\nI dey listen. 👂 Tell me wetin dey your heart.`,
                
                `🗣️ *Ehn ehn! You wan gist?*\n\n${userName}, na you get my ear today o!\n\nLife sweet sometimes, e sour sometimes. But na we go dey handle am.\n\n🔊 *Gist wey sweet:* Talk about your victories, your plans, your dreams.\n🔊 *Gist wey hard:* Talk about wahala, we go find solution together.\n\nNo hold anything back o. I dey here to listen and advice you well well. 💯`,
                
                `🗣️ *My padi! ${userName}!*\n\nHow you dey? I hope say your day dey go well.\n\nTell me something wey make you happy today. Or tell me something wey dey worry you.\n\nNa here we dey talk real talk. No be business, no be hustle - na life and gist.\n\n👂 I dey hear you. Come talk to me! 🗣️`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    },

    // ==================== ADVICE ====================
    advice: {
        keywords: ['advice', 'help', 'suggest', 'recommend', 'what should i do', 'what should i do now', 'what do you think', 'what do you advise', 'opinion', 'advise', 'guide', 'guide me', 'problem', 'issues', 'trouble', 'how to', 'how do i', 'what to do', 'need help', 'help me', 'help me out', 'solutions', 'way forward', 'advise me', 'give me advice', 'i need advice', 'i need guidance', 'i need direction', 'i no know wetin to do', 'i dey confuse', 'i am confused', 'i dey stuck', 'i am stuck', 'i need a solution', 'i need solution', 'how best can i handle this', 'how do i handle this', 'i no know wetin to do again', 'i dey lost', 'i am lost', 'i need direction', 'please advise me'],
        response: (userName) => {
            const responses = [
                `💡 *${userName}, wetin dey worry you?*\n\nNa advice you need? I go talk my mind o.\n\n1️⃣ *First:* Calm down. No matter wetin dey happen, e go pass. Na true talk.\n2️⃣ *Second:* Think about the problem well well. Write am down if you need.\n3️⃣ *Third:* Ask yourself - "Wetin I fit control?" Focus on that one.\n\n🔑 *My advice today:* If e go cost you your peace, e too expensive. Let am go.\n\n💬 You need more advice? Tell me wetin dey your mind. I go advice you like big brother/sister.`,
                
                `💡 *${userName}, make I give you small advice o!*\n\nLife na like market - some days market sweet, some days market sour. But na the strong people wey dey always come back.\n\n🌱 *Today's Advice:*\n• No compare your life to other people.\n• Your pace na your pace. Run your race.\n• If nobody dey clap for you, clap for yourself.\n• Small progress na still progress.\n\nYou get what e take. I believe in you! 💪`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    },

    // ==================== JOKES ====================
    jokes: {
        keywords: ['joke', 'jokes', 'funny', 'make me laugh', 'make i laugh', 'laugh', 'comedy', 'humor', 'funny joke', 'crack me up', 'lol', 'haha', 'hehe', 'laughing', 'funny story', 'make me smile', 'tell me something funny', 'i need laughter', 'i want to laugh', 'crack joke', 'make una laugh', 'make i smile', 'i dey dull', 'i need vibes', 'i wan laugh small'],
        response: (userName) => {
            const jokes = [
                `😂 *${userName}! I get joke for you o!*\n\nNaija man dey pray for money.\nGod ask am: "Wetin you want?"\nMan say: "Money wey go last me forever o!"\nGod say: "Okay o, take dis one."\nMan check: Na 1 naira coin!\nMan vex: "God na this one?"\nGod say: "E go last you forever... because you no fit spend am!" 😂😂😂\n\n*Shey you like am?* Oya tell me if you want more!`,

                `😂 *${userName}! Listen to dis one o!*\n\nWoman dey cry for church.\nPastor ask: "Wetin happen?"\nWoman say: "My husband say e go buy me car but e buy bicycle!"\nPastor say: "Na God's plan o. Praise Him!"\nWoman say: "But Pastor... e no get bicycle wey get seat o!"\nPastor say: "Na your destiny o! You go become professional cyclist!" 🚲😂\n\n*Oya laugh small!* 🎉`,

                `😂 *${userName}, I don get one more!*\n\nBaba dey tell im wife: "I go buy you anything you want for this shop."\nWife pick expensive bag.\nBaba look price: "Ah! This one na N500,000 o!"\nWife say: "But you say anything!"\nBaba say: "Anything... except this bag. And that one. And that one. Actually... anything wey no pass N1,000!" 😂\n\n*Na so life be o!* 😂😂😂`,

                `😂 *${userName}, wait make I give you dis one!*\n\nMan dey sleep, woman wake am.\nWoman: "Honey, wake up! I hear thief for kitchen!"\nMan: "Na you hear am? You get legs, go check am!"\nWoman: "But na your duty to protect me!"\nMan: "Okay o, give me my slippers..."\nWoman: "Wetin you wan do?"\nMan: "I go use am chase thief wey be say na your imagination!" 😂\n\n*Na wa o!* 😂`,

                `😂 *${userName}! Dis one na for you!*\n\nBaba dey drive car, police stop am.\nPolice: "Oga, why you dey drive drunk?"\nBaba: "I no drink o. Na just one bottle."\nPolice: "Na one bottle you drink and you dey drive?"\nBaba: "Na small bottle. Like 50cl."\nPolice: "Na still drink. Come out!"\nBaba: "But na Fanta!"\nPolice: "Eh?! Fanta? Why you no tell me from beginning?"\nBaba: "Because you no ask!" 🍊😂\n\n*Oya laugh!*`,

                `😂 *${userName}, I still get one more!*\n\nWoman dey tell her friend: "My husband say I talk too much."\nFriend: "Na true?"\nWoman: "Yes o. E say even when I dey sleep, I dey talk."\nFriend: "Wetin you dey talk for sleep?"\nWoman: "I dey tell am to wake up and listen to me!" 🗣️😂\n\n*Na wa for women o!* 😂`,

                `😂 *${userName}! Listen to dis one!*\n\nPastor dey pray for church: "God, give us patience!"\nMember for back shout: "Amen! Abeg God no give me!"\nPastor vex: "Wetin? You no want patience?"\nMember say: "Last time I pray for patience, my wife go bring trouble before I get am. The patience come but the trouble don finish me first!" 😂\n\n*Ehn ehn!* 😂😂`,

                `😂 *${userName}, make I share dis one o!*\n\nMan dey tell his friend: "I don find solution for our wahala."\nFriend: "Wetin be the solution?"\nMan: "If woman talk, you dey listen. If woman talk again, you still dey listen. If she talk third time, you dey agree."\nFriend: "But if she talk the fourth time?"\nMan: "That one na when you run! Na the only time you fit win!" 🏃‍♂️😂\n\n*Na so!*`,

                `😂 *${userName}, I don get one classic!*\n\nBaba dey eat for restaurant. Waitress come.\nWaitress: "Oga, wetin you want?"\nBaba: "I want chicken."\nWaitress: "Sorry o, chicken don finish."\nBaba: "Okay, I want fish."\nWaitress: "Fish don finish."\nBaba: "Okay, I want beef."\nWaitress: "Beef don finish."\nBaba vex: "Wetin dey this restaurant sef?!"\nWaitress: "Na only free air dey!"\nBaba: "Abeg bring am!" 😂\n\n*Na wa o!*`,

                `😂 *${userName}, dis one na fire!*\n\nWoman dey cook. Husband come.\nHusband: "Wetin you cook?"\nWoman: "I cook rice and stew."\nHusband: "But I no like stew."\nWoman: "Okay, I cook yam."\nHusband: "I no like yam."\nWoman: "I cook beans."\nHusband: "I no like beans."\nWoman vex: "Wetin you like sef?!"\nHusband: "I like you!"\nWoman melt: "Awww! Wetin you want chop?"\nHusband: "Anything wey you cook!" 😂🥰\n\n*E sweet you?*`,

                `😂 *${userName}! I get joke wey go make you cry laugh!*\n\nMan dey drive, e see sign: "Speed limit 50. You go pay N50,000 fine."\nMan laugh: "Na only N50,000? Na small money!"\nE drive 100km/h.\nPolice stop am: "Oga, you drive 100km/h. Fine na N100,000."\nMan: "But the sign say N50,000!"\nPolice: "The N50,000 na for speed 50. You drive 100, na double fine!"\nMan: "Na mathematics you dey use?"\nPolice: "Na common sense!" 😂\n\n*Oya laugh!*`,

                `😂 *${userName}, dis one na for you!*\n\nBoyfriend tell girlfriend: "I love you pass everything!"\nGirlfriend: "Pass money?"\nBoyfriend: "Yes!"\nGirlfriend: "Pass food?"\nBoyfriend: "Yes!"\nGirlfriend: "Pass phone?"\nBoyfriend: "... Wait, hold on... let me think..."\nGirlfriend: "Ah! You no love me!"\nBoyfriend: "I love you! I love you! I no need phone!"\nGirlfriend: "Okay, give me your phone make I confirm!" 📱😂\n\n*Na woman!* 😂`,

                `😂 *${userName}, I still get one more!*\n\nBaba dey tell son: "My son, when I die, I go leave you my farm."\nSon: "But Papa, you no get farm."\nBaba: "I know. Na you go buy am!"\nSon: "Papa wetin?! I no get money!"\nBaba: "That's why I go die first. You go use my insurance money buy am!" 💀😂\n\n*Na wa for Papa!*`,

                `😂 *${userName}! Listen to dis one!*\n\nHusband and wife dey quarrel.\nWife: "If I die, you go marry another woman?"\nHusband: "No o! I no go marry!"\nWife: "Na true? You no go marry again?"\nHusband: "Yes! I go stay single!"\nWife: "Awww! I love you!"\nHusband: "... I go stay single because who go marry me with all this wahala wey you carry come?!" 😂\n\n*The husband get sense!*`,

                `😂 *${userName}, dis one na the best!*\n\nMan dey pray for church: "God, make me rich!"\nPastor: "You need to sow seed first!"\nMan: "But I no get money to sow!"\nPastor: "That's why you need to sow seed!"\nMan: "But I no get!"\nPastor: "Sow what you get!"\nMan: "Na only my old shoes."\nPastor: "Sow am!"\nMan sow im old shoe.\nNext week, man come church with new shoes!\nPastor: "You see! God bless you!"\nMan: "No o! The person wey I give the old shoe now buy me new one!" 😂\n\n*God dey!* 🙏😂`
            ];
            return jokes[Math.floor(Math.random() * jokes.length)];
        }
    },

    // ==================== QUOTES / WISDOM ====================
    quotes: {
        keywords: ['quote', 'quotes', 'wisdom', 'inspire', 'motivate', 'motivation', 'inspiration', 'positive', 'thought', 'thinking', 'deep', 'meaning', 'life quote', 'wise', 'wise word', 'saying', 'proverb', 'inspirational', 'words of wisdom', 'give me a quote', 'inspiring word', 'deep quote', 'wise words', 'motivate me', 'inspire me', 'something deep', 'give me wisdom', 'drop wisdom', 'word for the day'],
        response: (userName) => {
            const quotes = [
                `🌟 *Quote for you, ${userName}*\n\n"Life na like bicycle - to keep balance, you must keep moving."\n\n🚴‍♂️ *Meaning:* No matter wetin happen, keep pushing forward. Na small step every day go lead you to big achievement.\n\n💭 *Your turn:* Wetin you think about this one?`,

                `🌟 *${userName}, read dis one o!*\n\n"Na the journey wey you fit no see, but you must walk am - that one na faith."\n\n🛤️ *Meaning:* Sometimes you no go see the end of the road, but you still need to move. Trust yourself and trust God.\n\n💭 *Think about am.* Share your own thought with me!`,

                `🌟 *Wisdom for you ${userName}*\n\n"Na today wey you get, no be tomorrow you go get. Use today well."\n\n⏰ *Meaning:* No waste today. Do wetin you fit do now. Tomorrow fit no be same.\n\n💭 *Wetin you go do today?* Tell me!`
            ];
            return quotes[Math.floor(Math.random() * quotes.length)];
        }
    },

    // ==================== REMINDERS ====================
    reminders: {
        keywords: ['remind', 'reminder', 'remember', 'dont forget', 'remind me', 'set reminder', 'alarm', 'note to self', 'schedule', 'wake me', 'notify me', 'tell me later'],
        response: (userName) => {
            return `⏰ *${userName}, I dey here to remind you o!*\n\nJust tell me wetin you want me remember for you.\n\n📝 *Example:*\n• "Remind me to call Mama at 5pm"\n• "Remind me to buy bread tomorrow"\n• "Remind me to pray"\n\nNa I go remember for you. No worry! 💪\n\n*Wetin you want me remind you?* Just tell me!`;
        }
    },

    // ==================== NOTES ====================
    notes: {
        keywords: ['note', 'notes', 'write', 'save', 'record', 'write down', 'take note', 'jot', 'jot down', 'save this', 'keep this'],
        response: (userName) => {
            return `📝 *${userName}, I dey save your notes o!*\n\nTell me wetin you want write down.\n\n📒 *Examples:*\n• "Note: My friend's birthday is July 20"\n• "Note: I want buy new phone"\n• "Note: I need to rest more"\n\nE go dey safe with me. You fit ask for am anytime.\n\n*Wetin you want write?* Tell me!`;
        }
    },

    // ==================== BORED ====================
    bored: {
        keywords: ['bored', 'nothing to do', 'idle', 'wasting time', 'boring', 'game', 'play', 'entertain', 'entertainment', 'no wahala', 'I dey idle', 'I no get wetin do'],
        response: (userName) => {
            const activities = [
                `🎮 *${userName}, you dey bored? No wahala!*\n\nThings you fit do:\n📚 Read something new\n🎵 Listen to music wey sweet\n🚶‍♂️ Go walk small\n📞 Call someone wey you no don call for long time\n🎬 Watch movie\n🧠 Learn new skill\n\n💬 Or we fit just gist! Tell me wetin you dey feel like doing.`,

                `🎲 *${userName}! I get ideas for you!*\n\nYou fit:\n🃏 Play games for phone\n📝 Write down your goals for 2026\n🧘 Do small exercise\n📸 Look through your photos and remember memories\n✍️ Write letter to future you\n\nWetin you choose? Or we fit just talk! 🗣️`
            ];
            return activities[Math.floor(Math.random() * activities.length)];
        }
    },

    // ==================== HAPPY / SAD ====================
    feeling: {
        keywords: ['happy', 'sad', 'feeling', 'emotion', 'mood', 'down', 'up', 'excited', 'worried', 'anxious', 'lonely', 'tired', 'stress', 'depressed', 'cry', 'smile', 'joy', 'pain', 'hurt', 'broken', 'suffering', 'happy day', 'bad day', 'good day', 'i dey sad', 'i am sad', 'i dey happy', 'i am happy', 'i dey tired', 'i am tired', 'i dey down', 'i am down', 'i dey stressed', 'i am stressed', 'i dey worried', 'i am worried', 'i dey lonely', 'i am lonely', 'i dey anxious', 'i am anxious', 'i dey depressed', 'i am depressed', 'i dey broken', 'i am broken', 'i need comfort', 'i no feel fine', 'i no dey okay', 'i no dey feel good', 'i dey weak', 'i am weak', 'i dey frustrated', 'i am frustrated'],
        response: (userName) => {
            const responses = [
                `❤️ *${userName}, I dey hear you o!*\n\nWetin you dey feel, na real feeling. No be small thing.\n\nIf you happy: Celebrate am! 🎉 Tell me wetin make you happy make I join you.\nIf you sad: E go pass. No worry. I dey here. 🤗\n\n💭 *Remember:* Feeling no be forever. Tomorrow fit be better.\n\n🗣️ Talk to me. I go listen. I go understand.`,

                `🌻 *${userName}, I see you o!*\n\nLife get ups and downs. Na normal thing.\n\n• If you dey up: Enjoy am well well! 🚀\n• If you dey down: Know say e go pass. 🌅\n\nYou no dey alone. I dey here. People wey love you dey.\n\n💬 Tell me wetin dey your mind. Make we share am together.`
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    },

    // ==================== DREAM / GOALS ====================
    dreams: {
        keywords: ['dream', 'dreams', 'goal', 'goals', 'ambition', 'plan', 'plans', 'future', 'vision', 'aspiration', 'wish', 'hope', 'want to', 'i want', 'i wish', 'i hope', 'my dream'],
        response: (userName) => {
            return `🌟 *${userName}, wetin be your dream?*\n\nTalk to me about wetin you want achieve.\n\n🎯 *Big dreams:* Nothing too big!\n🎯 *Small dreams:* Every small dream matter!\n\n💭 *Remember:*\n• Dream no be crime\n• Your dream na valid\n• You fit achieve am\n• Start small, dream big\n\n🗣️ Tell me your dream. I go help you think am through. 🙏`
        }
    },

    // ==================== GRATITUDE ====================
    gratitude: {
        keywords: ['thank', 'thanks', 'grateful', 'appreciate', 'bless', 'blessing', 'gratitude', 'thankful', 'na God', 'God bless', 'chai', 'ehn ehn', 'I thank God', 'God dey'],
        response: (userName) => {
            return `🙏 *${userName}, I love your heart!*\n\nGratitude na powerful thing. When you thank God, e go open doors wey you no know dey exist.\n\n🌅 *Things to thank God for today:*\n• Life - you wake up!\n• Health - you dey breathe!\n• Family - people wey love you!\n• Food - something for belly!\n• Strength - you dey carry on!\n\n💭 *Your turn:* Wetin you thank God for today? Share am make I celebrate with you! 🎉`
        }
    },

    // ==================== MOTIVATION ====================
    motivation: {
        keywords: ['motivate', 'encourage', 'inspire', 'strength', 'courage', 'keep going', 'dont give up', 'never give up', 'persevere', 'perseverance', 'try again', 'rise', 'stand up', 'I cant', 'I no fit', 'discouraged'],
        response: (userName) => {
            const messages = [
                `💪 *${userName}! I go motivate you!*\n\nNo give up o! You be warrior! You fit do am!\n\n🔥 *Remember:*\n• Every champion start small\n• Every journey start with one step\n• Every success get story of struggle\n• Your story no finish yet!\n\n🦁 *You be lion!* No be goat!\n\n🗣️ Wetin you wan achieve? Tell me make I cheer you! 📣`,
                `🌟 *${userName}, calm down and breathe.*\n\nYou no dey alone. If you fit start, you fit continue. Small progress still progress. One step today na better than zero.\n\nYou get this! I believe in you. 💛`,
                `🚀 *${userName}, no let the pressure kill your shine.*\n\nLife fit be hard sometimes, but you no need to quit just because e tough. Keep your head up, keep moving, and trust your journey. 🙌`
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
    },

    // ==================== PRAYER ====================
    prayer: {
        keywords: ['pray', 'prayer', 'pray for me', 'God', 'Jesus', 'Allah', 'church', 'mosque', 'faith', 'spiritual', 'bless me', 'prayers', 'amen', 'hallelujah', 'alhamdulillah', 'intercede', 'supplication'],
        response: (userName) => {
            const prayers = [
                `🙏 *${userName}, I go pray for you!*\n\nGod wey see you, e go answer you.\n\n🕊️ *My prayer for you today:*\n• May you find peace wey pass understanding\n• May your heart dey light and your mind dey clear\n• May good people cross your path\n• May your blessings overflow\n• May you see the goodness of God\n\n📖 *Remember:* "Ask, and e go give you. Seek, and you go find."\n\nAmen! 🙌`,
                `🌿 *${userName}, I dey hold you in prayer.*\n\nMay your worries reduce, your strength increase, and your heart find rest. May every burden wey heavy for you become lighter today. 🙏`,
                `🕯️ *${userName}, I pray for calm for your mind and peace for your spirit.*\n\nMay God guide your steps, bless your path, and make your day better than you expect. Amen. ✨`
            ];
            return prayers[Math.floor(Math.random() * prayers.length)];
        }
    },

    // ==================== FOOD ====================
    food: {
        keywords: ['food', 'eat', 'hungry', 'cook', 'recipe', 'meal', 'breakfast', 'lunch', 'dinner', 'snack', 'rice', 'beans', 'yam', 'plantain', 'jollof', 'egusi', 'stew', 'pepper', 'soup', 'swallow', 'amala', 'eba', 'fufu', 'garri', 'indomie', 'noodles', 'spaghetti'],
        response: (userName) => {
            return `🍲 *${userName}! You don talk about food!* 😋\n\nFood na life o! Wetin you dey chop today?\n\n🍛 *Options:*\n• Rice and stew - classic!\n• Jollof rice - party style!\n• Egusi soup - sweet!\n• Yam and egg - breakfast!\n• Indomie - student special!\n• Amala and ewedu - native!\n\n😩 *Abeg no make me hungry o!*\n\nWetin you go chop? Tell me make I salivate with you! 🍽️`
        }
    },

    // ==================== FAMILY ====================
    family: {
        keywords: ['family', 'mother', 'father', 'sister', 'brother', 'child', 'children', 'parent', 'home', 'husband', 'wife', 'mummy', 'daddy', 'uncle', 'auntie', 'cousin', 'relative', 'people', 'house', 'family matter', 'home front'],
        response: (userName) => {
            return `👨‍👩‍👧‍👦 *${userName}, family na everything!*\n\nNo matter wetin happen, family dey.\n\n💖 *Wetin family be:*\n• People wey love you no matter what\n• People wey go stand by you\n• People wey fit vex but still love\n• People wey share your blood\n\n📞 *Call your people today!* No dey wait for special day.\n\n🗣️ Wetin dey happen for your family? Tell me! I dey listen.`
        }
    },

    // ==================== LOVE ====================
    love: {
        keywords: ['love', 'lover', 'girlfriend', 'boyfriend', 'relationship', 'crush', 'date', 'romance', 'heart', 'sweet', 'partner', 'husband', 'wife', 'babe', 'baby', 'sweetheart', 'darling', 'kiss', 'hug', 'fall in love', 'in love', 'loving', 'romantic'],
        response: (userName) => {
            return `❤️ *${userName}! You don mention love!*\n\nLove na sweet thing o! 🥰\n\n💞 *Love dey everywhere:*\n• Love for family\n• Love for friends\n• Love for partner\n• Love for yourself\n\n💔 *If love pain:* E go heal. Time go tell.\n\n🗣️ Tell me about your love life! Na safe space. I go listen and advice. 😊`
        }
    },

    // ==================== FRIENDS ====================
    friends: {
        keywords: ['friend', 'friends', 'padi', 'buddy', 'bestie', 'mate', 'homie', 'colleague', 'companion', 'partner'],
        response: (userName) => {
            return `🤝 *${userName}! Friends na treasure!*\n\nGood friends dey hard to find. If you get them, hold them well!\n\n👫 *True friends:*\n• Dem dey there for you\n• Dem go defend you\n• Dem go advise you\n• Dem go laugh with you\n\n📱 *Call your padi today!* Tell them you love them.\n\n🗣️ Tell me about your friends! Make I hear the gist!`
        }
    },

    // ==================== WORK / HUSTLE ====================
    work: {
        keywords: ['work', 'job', 'hustle', 'business', 'career', 'profession', 'office', 'salary', 'pay', 'money', 'income', 'boss', 'colleague', 'promotion', 'stress', 'tired'],
        response: (userName) => {
            return `💰 *${userName}, hustle dey real!*\n\nBut e go pay off. No worry.\n\n💪 *Hustle motivation:*\n• Your hustle today na your luxury tomorrow\n• Small money better than no money\n• No compare your hustle to other people\n• Rest when you need to\n\n🛑 *Remember:* You no be machine. Rest dey important.\n\n🗣️ How work dey? Tell me wetin dey happen for your office/business.`
        }
    },

    // ==================== SCHOOL ====================
    school: {
        keywords: ['school', 'student', 'lecture', 'exam', 'assignment', 'teacher', 'professor', 'class', 'university', 'college', 'learn', 'study', 'read', 'book', 'degree', 'course'],
        response: (userName) => {
            return `📚 *${userName}! School dey stress, but e go end!*\n\n🎓 *School advice:*\n• Read small every day\n• No wait until exam before you read\n• Find people wey fit teach you\n• Enjoy the process\n\n🧠 *Knowledge na power!* E no dey expire.\n\n📝 *Wetin dey happen for school?* Share the gist!`
        }
    },

    // ==================== TRAVEL ====================
    travel: {
        keywords: ['travel', 'trip', 'journey', 'vacation', 'holiday', 'tour', 'tourist', 'flight', 'car', 'bus', 'train', 'road', 'move', 'go', 'visit', 'see', 'abroad', 'lagos', 'ibadan', 'ph', 'benin', 'delta'],
        response: (userName) => {
            return `✈️ *${userName}! You wan travel!*\n\nTravel na sweet thing o! 🏖️\n\n🗺️ *Places you fit go:*\n• Lagos - Center of excellence\n• Abuja - Federal Capital\n• PH - Garden city\n• Ibadan - Breeze dey\n• Ghana - Small abroad\n• London - Proper abroad\n\n🚗 *Make sure you:*\n• Plan well\n• Save money\n• Enjoy every moment\n• Take many photos\n\n🗣️ Where you dey go? Tell me make I dey jealous! 😂`
        }
    },

    // ==================== HEALTH ====================
    health: {
        keywords: ['health', 'sick', 'ill', 'disease', 'hospital', 'doctor', 'medicine', 'drug', 'pain', 'body', 'fever', 'malaria', 'typhoid', 'headache', 'stomach', 'flu', 'cough', 'cold'],
        response: (userName) => {
            return `🏥 *${userName}! Health na wealth!*\n\nNo joke with your body o!\n\n💊 *Health tips:*\n• Drink plenty water\n• Rest well\n• Eat good food\n• Exercise small\n• Go hospital when you sick\n\n🛑 *Remember:* Your body na temple. Take care of am.\n\n🤒 *Are you sick?* Tell me, I go pray for you! 💪`
        }
    },

    // ==================== MONEY ====================
    money: {
        keywords: ['money', 'cash', 'funds', 'finance', 'wealth', 'rich', 'poor', 'broke', 'dollar', 'naira', 'pounds', 'sapa', 'salary', 'pay', 'profit', 'savings', 'investment', 'finance'],
        response: (userName) => {
            return `💰 *${userName}! Money matter!*\n\nE no easy but e go come.\n\n💸 *Money gist:*\n• Small money better than no money\n• Save something every month\n• No borrow to flex\n• Invest for the future\n\n📊 *You fit try:*\n• Fixed deposit\n• Ajo/Esusu\n• Small business\n• Learn new skill\n\n🗣️ How money dey? Wetin dey happen for your finance?`
        }
    },

    // ==================== ENTERTAINMENT ====================
    entertainment: {
        keywords: ['movie', 'film', 'cinema', 'netflix', 'show', 'series', 'music', 'song', 'artist', 'celebrity', 'actor', 'actress', 'entertainment', 'concert', 'show', 'performance'],
        response: (userName) => {
            return `🎬 *${userName}! You dey talk entertainment!*\n\nNa sweet thing o!\n\n🎵 *Nigerian music dey everywhere:*\n• Burna Boy - African Giant\n• Wizkid - Starboy\n• Davido - OBO\n• Asake - Mr. Money\n• Rema - Rave\n\n🎬 *Movies:*\n• Nollywood dey shine\n• Hollywood dey show\n• K-drama dey take over!\n\n🗣️ Wetin you watch/listen to? Tell me the gist!`
        }
    },

    // ==================== FAITH / RELIGION ====================
    faith: {
        keywords: ['faith', 'god', 'jesus', 'allah', 'church', 'mosque', 'pastor', 'imam', 'bible', 'quran', 'worship', 'prayer', 'miracle', 'testimony', 'hallelujah', 'alhamdulillah', 'amen'],
        response: (userName) => {
            return `🙌 *${userName}! Faith move mountains!*\n\nYour belief na your power.\n\n🕊️ *Remember:*\n• God no go leave you\n• Your prayer no dey waste\n• Miracles still happen\n• Your faith na your strength\n\n📖 *Trust God through everything.* E go come good.\n\n🗣️ How your faith journey dey? Tell me!`
        }
    }

};
