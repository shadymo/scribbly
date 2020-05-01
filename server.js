const io = require('socket.io')(3000);

var users = {}

io.on('connection', (socket) =>{
    socket.emit('welcome', users)
    socket.on('nameInput', data =>{
        users[socket.id] = data
        console.log(users)
        io.emit('userConnected', users)
    })
    socket.on('disconnect', () =>{
        delete users[socket.id]
        console.log(users)
    })
    socket.on('drawing', (pos) =>{
        io.emit('elseDraw', pos)
    })
    socket.on('newStart', (pos) =>{
        io.emit('updateStart', pos)
    })
});

