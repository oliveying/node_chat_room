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
          items.push(item);
          console.log('end')
          res.end('ok\n')
        })
        break;
    case 'GET':
      var body = items.map(function(item, i) {
        return i + ')' +  item ;
      }).join('\n');
      // res.setHeader('Content-Length', Buffer.byteLength[body]);
      res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path = url.parse(req.url).pathname;
      var i = parseInt(path.slice(1), 10);
      if (isNaN(i)){
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[i]) {
        res.statusCode = 400;
        res.end('item not found');
      } else {
        items.splice(i, 1);
        res.end('ok\n');
      }
      break;
  }
  
  // res.setHeader('Content-Type', 'text/html');
  // res.statusCode = 301;
  
});
server.listen(3000, function() {
  console.log('listening 3000');
})