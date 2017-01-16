import keypress from "keypress";

export default function keyboardPress(callback) {
  keypress(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    console.log('got "keypress"', key);
    if (key && key.ctrl &&  key.name == 'w') {
      callback('+');
      console.log('increased');
    };
    if (key && key.ctrl && key.name == 'q') {
      callback('-');
      console.log("decreased");
    };

    //HACK cause of development process running specific
    if (process.env.NODE_ENV === 'production') {
      if (key && key.ctrl && key.name == 'c') {
        process.exit();
      };
    };
    //---
  });
  global.listeningKeypress = true;

  //HACK cause of development process running specific
  if (process.env.NODE_ENV === 'production') {
    process.stdin.setRawMode(true);
    process.stdin.resume();
  };
  //---
};