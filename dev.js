const htttp = require('http');
const path = require('path');
const fs = require('fs');

htttp.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile(path.join(__dirname, './src/index.html'), function (err, data) {
    if (err) {
      res.end('error')
    }
    res.end(data.toString());
  });
  // console.log('hnih')
}).listen(8001, function(){
  console.log('start 8001 listen');
});
