import TelegramBot from 'node-telegram-bot-api';

const bot_token = '329181543:AAE7wI9K8U-a2321XF_GY7RlTmXGNQbUTWY';

export default function telegramBot(getValue) {

  const bot = new TelegramBot(bot_token, {polling: true});

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const commandEnd = messageText.indexOf(" ");
    const command = messageText.substring(0, commandEnd);        // geting command from user message
console.log(command);
    const helpMeassage = '/get "[name]" - get value.'; // /help command message
    const wtf = 'wtf?!';                               // not a command message
    const notExist = "this thing doesn't exist.";      // thing doesn't exist message

    const searchStore = function(thing) {
      return getValue(thing);
    }

    const sendValue = function(name) {
      searchStore(name) 
        ? bot.sendMessage(chatId, searchStore(name))
        : bot.sendMessage(chatId, notExist);
    }

    switch(command) {
      case '/help':
        bot.sendMessage(chatId, helpMeassage);
        break;
      case '/get':
        const name = messageText.substring(5);         // getting name of the thing from user message
        sendValue(name);
        break;
      default:
        const wtf = 'wtf?!'
        bot.sendMessage(chatId, wtf);
    }
  })  
};