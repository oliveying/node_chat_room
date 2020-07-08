const htttp = require('http');
const path = require('path');
const fs = require('fs');

htttp.createServer(function(req, res) {
  console.log(req.url);
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (req.url === '/') {
    getFs('./src/index.html', res);
  } else if (req.url === '/chart') {
    getFs('./src/html/chat.html', res);
  } else if (req.url === '/circle') {
    getFs('./src/html/circle.html', res);
  } else if (req.url === '/pie') {
    getFs('./src/html/pie.html', res);
  }
  
  // console.log('hnih')
}).listen(8001, function(){
  console.log('start 8001 listen');
});

function getFs (url, res) {
  fs.readFile(path.join(__dirname, url), function (err, data) {
    if (err) {
      res.end('error')
    }
    res.end(data.toString());
  });
}