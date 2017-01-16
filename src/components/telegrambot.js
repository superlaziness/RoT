import TelegramBot from 'node-telegram-bot-api';

const bot_token = '329181543:AAE7wI9K8U-a2321XF_GY7RlTmXGNQbUTWY';

export default function telegramBot(callback) {

  const bot = new TelegramBot(bot_token, {polling: true});

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.txt;

    const searchStore = function(thing) {

    }

    if(messageText === '/help') {
      bot.sendMessage(chatId, '"[name]" - get value.');
    } else {
      searchStore(msg.txt) 
        ? bot.sendMessage(chatId, 'value')
        : bot.sendMessage(chatId, 'what the huynya you just wrote?!');
    };
  })
  
};