import TelegramBot from 'node-telegram-bot-api';

const botTokenPath = 'bottoken.js';  // Path to file, containing telegram bot token;

export default function telegramBot(getValue, getList) {

  try {
    const bot_token = require(botTokenPath);
  } catch (err) {
    console.log('Bot token is missing! \n' + err);
    return false;
  }

  const bot = new TelegramBot(bot_token.token, { polling: true });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const helpMessage = '/get "[name]" - get value.\n/list - list of existing things.'; // /help command message
    const wtf = 'wtf?!';                               // not a command message
    const notExist = "this thing doesn't exist.";      // thing doesn't exist message
    const errorMesage = 'error';                       // error message


    const commandEnd = messageText.indexOf(' ');
    let command;
    commandEnd === -1
      ? command = messageText
      : command = messageText.substring(0, commandEnd); // geting command from user message

    const searchStore = function (thing) {
      return getValue(thing);
    };

    const sendMessage = function (message) {
      message !== '' || message !== undefined
        ? bot.sendMessage(chatId, message)
        : bot.sendMessage(chatId, errorMesage);
    };

    const parseObject = function (object, str = '') {
      let newStr = str;
      for (const name in object) {
        if (typeof object[name] === 'object') {
          newStr += `${name}:\n${parseObject(object[name])}`;
          parseObject(object[name]);
        } else {
          newStr += `- ${name}: ${object[name]}\n`;
        }
      }
      return newStr;
    };

    const sendValue = function (name) {
      const thingValue = searchStore(name);
      if (thingValue !== undefined) {
        if (typeof thingValue === 'object') {
          console.log(thingValue);
          sendMessage(parseObject(thingValue));
        } else {
          sendMessage(thingValue);
        }
      } else {
        sendMessage(notExist);
      }
    };

    const sendList = function () {
      const list = getList();
      const listMessage = `Things available:\n ${list.join('\n ')}`;
      sendMessage(listMessage);
    };

    switch (command) {
      case '/help':
        sendMessage(helpMessage);
        break;
      case '/get': {
        // getting name of the thing from user message
        const name = messageText.substring(commandEnd + 1);
        sendValue(name);
        break;
      }
      case '/list':
        sendList();
        break;
      default:
        sendMessage(wtf);
    }
  });
}
