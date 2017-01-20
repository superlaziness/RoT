const socketIOMiddleware = () => {
  let socketDispatch;
  let socketClient;
  let io;

  if (!__BROWSER__) {
    io = require('socket.io')(2002);
    io.on('connection', socket => {
      // console.log('connected client');
      socket.on('socket action', data => {
        if (!socketDispatch) return;
        socketDispatch(data);
        socket.broadcast.emit('socket action', data);
        // console.log('action recieved', data);
      });
    });
  } else {
    socketClient = require('socket.io-client')(':2002');
    socketClient.on('socket action', data => {
      if (!socketDispatch) return;
      socketDispatch(data);
      // console.log('action recieved', data);
    });
  }

  return ({ dispatch }) => {
    socketDispatch = dispatch;
    return next => action => {
      if (action.socket && !action.recieved) {
        const socket = io || socketClient;
        if (socket) {
          socket.emit('socket action', { ...action, recieved: true });
          // console.log('action emmited');
        }
      }
      return next(action);
    };
  };
};

export default socketIOMiddleware;
