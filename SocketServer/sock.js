const io = require('socket.io')(4000, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

console.log('running!')

let id = 1;
let clientNo = 0;
const Rooms = [];


//On Client Connect
io.on('connection', socket => {
  //How many connections currently
  clientNo++;
  console.log(`Have a connection on ${socket.id}`)

  //Step 1 Choose Room
  socket.on('createR', (room) => {
    console.log('creating')
    if (Rooms.includes(room)) {
      //Send error message
    } else {
      Rooms.push(room)
      socket.join(room)
    }
  })

  socket.on('joinR', (room) => {
    console.log('joining')
    if (!Rooms.includes(room)) {
      //Send Error No room Exists
    } else if (io.sockets.adapter.rooms[room].length > 2) {
      //Send Error Too Many People
    } else {
      socket.join(room)
      //send Procees Request to Index
    }
  })


  //When a client closes their page
  socket.on('disconnect', socket => {
    console.log('disconnected')
    clientNo--;
  })

})


  // socket.join(Math.round(clientNo/2))
  // console.log(socket.rooms)