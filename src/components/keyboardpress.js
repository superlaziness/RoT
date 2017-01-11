import keypress from "keypress";

export default function keyboardPress(props) {
  if (!__BROWSER__) {
    if (!global.listeningKeypress) {
      keypress(process.stdin);
      process.stdin.on('keypress', function (ch, key) {
        console.log('got "keypress"', key);
        if (key && key.ctrl &&  key.name == 'w') {
          props.increaseEncoder();
          console.log('increased');
        };
        if (key && key.ctrl && key.name == 'q') {
          props.decreaseEncoder();
          console.log("decreased");
        };
        if (key && key.ctrl && key.name == 'c') {
          process.exit();
        };
      });
      process.stdin.setRawMode(true);
      process.stdin.resume();
    }
    global.listeningKeypress = true;
  }
};