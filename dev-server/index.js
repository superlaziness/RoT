const keypress = require('keypress');

const path = require('path');
const webpack = require('webpack');
const clientConfig = require('../webpack.client.config');
const serverConfig = require('../webpack.server.config');

const exec = require('child_process').exec;

const serverCompiler = webpack(serverConfig);

let serverProcess;

serverCompiler.watch({
  aggregateTimeout: 300,
  poll: true,
}, (err, stats) => {
  console.log(stats);
  if (serverProcess) serverProcess.kill();
  serverProcess = exec('node '+path.join(__dirname,'..','dist/server.js'));
  serverProcess.stdin.setEncoding('utf-8');
  serverProcess.stdout.pipe(process.stdout);
  serverProcess.stderr.pipe(process.stderr);

  //HACK FOR KEYBOARD INPUT IN TERMINAL
  keypress(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
      if (serverProcess) serverProcess.kill();
      process.exit();
    };
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();

  

  //------------

  process.stdin.pipe(serverProcess.stdin);
});