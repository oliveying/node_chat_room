var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

const server = http.createServer(function(req, res) {
  var url = parse(req.url);
  var path = join(root, url.pathname);
  fs.stat(path, function(err, stat) {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('404 not found')
      } else {
        res.statusCode = 500;
        res.end('500 server error')
      }
    } else {
      res.setHeader('Content-Lenth', stat.size);
      var stream = fs.createReadStream(path);
      stream.pipe(res);
      stream.on('error', function(err){
        if (err.status === 500) {
          res.statusCode = 500;
          res.end('500 server error')
        }
      })
    }
  })
})
server.listen(3000, function() {
  console.log('start listening 3000')
})
