import TelegramBot from 'node-telegram-bot-api';

const bot_token = '329181543:AAE7wI9K8U-a2321XF_GY7RlTmXGNQbUTWY';

export default function telegramBot(getValue, getList, setValue) {

  const bot = new TelegramBot(bot_token, {polling: true});

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    const helpMessage = '/get "[name]" - get value.\n/list - list of existing things.'; // /help command message
    const wtf = 'wtf?!';                               // not a command message
    const notExist = "this thing doesn't exist.";      // thing doesn't exist message
    const errorMesage = "error";                       // error message


    const commandEnd = messageText.indexOf(" ");
    let command;
    commandEnd === -1 
      ? command = messageText
      : command = messageText.substring(0, commandEnd); // geting command from user message

    const searchStore = function(thing) {
      return getValue(thing);
    }

    const sendValue = function(name) {
      const thingValue = searchStore(name);
      if (thingValue !== undefined) {
        if(typeof thingValue === 'object') {
          console.log(thingValue);
          sendMessage(parseObject(thingValue));
        } else {
          sendMessage(thingValue);
        }
      } else {
        sendMessage(notExist);
      }
    }

    const sendMessage = function(message) {
      message !== "" || message !== undefined 
        ? bot.sendMessage(chatId, message)
        : bot.sendMessage(chatId, errorMesage);
    }

    const parseObject = function(object, str = '') {
      for(let name in object) {
        if(typeof object[name] === 'object') {
          str += name + ":\n" + parseObject(object[name]);
          parseObject(object[name]);
        } else {
          str += "- " + name + ": " + object[name] + "\n";
        }
      }
      return str;
    }

    const sendList = function() {
      const list = getList();
      const listMessage = "Things available:\n " + list.join('\n ');
      sendMessage(listMessage);
    }

    switch(command) {
      case '/help':
        sendMessage(helpMessage);
        break;
      case '/get':
        const name = messageText.substring(commandEnd + 1);         // getting name of the thing from user message
        sendValue(name);
        break;
      case '/list':
        sendList();
        break;
      default:
        const wtf = 'wtf?!'
        sendMessage(wtf);
    }
  })  
};