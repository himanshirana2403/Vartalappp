// const io = require('socket.io')({
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });
  
//   const users = {};
  

//   io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//       console.log("New user joined:", name)
//       users[socket.id] = name;
//       socket.broadcast.emit('user-joined', name);
//     });
  




//     socket.on('send', message => {
        
//       socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     });
  
//   socket.on('disconnect', () => {
        
//     socket.broadcast.emit('left', users[socket.id]);
//     delete users[socket.id];
//   });

// });


//   io.listen(8000);
  const io = require('socket.io')({
  cors: {
    origin: "https://vartalappp-b6wwghlpt-himanshirana2403s-projects.vercel.app", // Allow only your frontend URL
    methods: ["GET", "POST"], // Allow GET and POST requests
  },
});

const users = {};

io.on('connection', (socket) => {
  // Handle user joining
  socket.on('new-user-joined', (name) => {
    console.log("New user joined:", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  // Handle message sending
  socket.on('send', (message) => {
    socket.broadcast.emit('receive', {
      message: message,
      name: users[socket.id],
    });
  });

  // Handle user disconnecting
  socket.on('disconnect', () => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});

// Use environment port or fallback to 8000
const PORT = process.env.PORT || 8000;
io.listen(PORT);

console.log(`Socket.io server is listening on port ${PORT}`);

