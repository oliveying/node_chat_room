const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  fs.readFile(path.join(__dirname, './cross.html'), function(err, data){
    res.end(data, 'this is success');
  })
  
}).listen(3001, function() {
  console.log('start cross1')
})