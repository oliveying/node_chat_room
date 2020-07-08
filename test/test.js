const http = require('http');
const url = require('url');
var items = [];

var server = http.createServer(function(req, res) {
  switch (req.method) {
    case 'POST':
      var item = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk) {
          item += chunk;
          console.log(chunk, 'chunk');
        })
        req.on('end', function() {
          item.push(item);
          console.log('end')
          res.end('ok\n')
        })
        break;
    case 'GET':
      items.forEach(function(item, i) {
        res.write(i + ')' + item + '\n')
      })
  }
  
  // res.setHeader('Content-Type', 'text/html');
  // res.statusCode = 301;
  
});
server.listen(3000, function() {
  console.log('listening 3000');
})