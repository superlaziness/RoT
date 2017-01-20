const keypress = require('keypress');
const spawn = require('cross-spawn');

const path = require('path');
const webpack = require('webpack');
const serverConfig = require('../webpack.server.config');

const options = {
  env: process.env,
};


// Start client (webpack-dev-server)
const clientProcess = spawn('npm', ['run', 'client-dev'], options);
clientProcess.stdout.pipe(process.stdout);
clientProcess.stderr.pipe(process.stderr);

// Start server with webpack watcher / Restart server process when it recompiles
const serverCompiler = webpack(serverConfig);

let serverProcess;
serverCompiler.watch(
  {
    aggregateTimeout: 300,
    poll: 2000,
    ignored: /node_modules/,
  },
  (err) => {
    if (err) process.stderr.write(err);
    if (serverProcess) serverProcess.kill();
    serverProcess = spawn('node', [path.join(__dirname, '..', 'dist/server.js')], options, (error) => (process.stderr.write(error)));
    serverProcess.stdin.setEncoding('utf-8');
    serverProcess.stdout.pipe(process.stdout);
    serverProcess.stderr.pipe(process.stderr);

    // HACK FOR KEYBOARD INPUT IN TERMINAL
    keypress(process.stdin);
    process.stdin.on('keypress', (ch, key) => {
      if (key && key.ctrl && key.name === 'c') {
        // We have to kill all children before exit
        if (serverProcess) serverProcess.kill();
        if (clientProcess) clientProcess.kill();
        process.exit();
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
    //------------

    process.stdin.pipe(serverProcess.stdin);
  }
);
