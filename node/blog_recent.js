var htttp = require('http');
var fs = require('fs');
var path = require('path');

htttp.createServer(function(req, res) {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, './title.json'), function(err, data) {
      if (err) {
        console.log(err);
        res.end('server error');
      } else {
        var title = JSON.parse(data.toString());
        fs.readFile(path.join(__dirname, './template.html'), function(err, data) {
          if (err) {
            console.error(err);
            res.end('server error')
          } else {
            var temp = data.toString();

            var html = temp.replace('%', title.join('<li></li>'));
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
          }
        })
      }
    })
  }
}).listen(8000, '127.0.0.1')