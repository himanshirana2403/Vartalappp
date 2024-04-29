/*const io = require('socket.io')({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  const users = {};
  

  io.on('connection', socket => {
    socket.on('new-user-joined', name => {
      console.log("New user joined:", name)
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
  




    socket.on('send', message => {
        
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
  
  socket.on('disconnect', () => {
        
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });

});


  io.listen(8000);
  */
  const io = require('socket.io')({
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  const users = {};
  
  io.on('connection', socket => {
    socket.on('new-user-joined', name => {
      console.log("New user joined:", name)
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
  
    socket.on('send', message => {
      socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
  
    socket.on('disconnect', () => {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    });
  });
  
  const PORT = process.env.PORT || 8000; // Use environment port or fallback to 8000
  io.listen(PORT, '0.0.0.0', () => {
    console.log(`Socket.IO server is running on port ${PORT}`);
  });
  
