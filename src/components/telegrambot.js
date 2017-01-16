import TelegramBot from 'node-telegram-bot-api';

const bot_token = '329181543:AAE7wI9K8U-a2321XF_GY7RlTmXGNQbUTWY';

export default function telegramBot(getValue) {

  const bot = new TelegramBot(bot_token, {polling: true});
  console.log(bot);

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const searchStore = function(thing) {
      return getValue(thing);
    }

    if(messageText === '/help') {
      bot.sendMessage(chatId, '"[name]" - get value.');
    } else {
      searchStore(msg.text) 
        ? bot.sendMessage(chatId, searchStore(msg.text))
        : bot.sendMessage(chatId, 'what the huynya you just wrote?!');
    };
  })
  
};