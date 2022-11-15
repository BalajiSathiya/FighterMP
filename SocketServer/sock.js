const io = require('socket.io')(4000, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

console.log('running!')

io.on('connection', socket => {
  console.log(socket.id)
  socket.on('custom-event', (y) => {
    // console.log(y)
    socket.broadcast.emit('user-y', y)
  })
})
