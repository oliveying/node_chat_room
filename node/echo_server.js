var net = require('net');

var server = net.createServer(function (socket) {
  socket.on('data', function(data) {
    console.log(data)
    socket.write(data);
    socket.pipe(socket);
  })
})
server.listen(8888)
