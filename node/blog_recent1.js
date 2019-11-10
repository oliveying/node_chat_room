var fs = require('fs');
var http = require('http');
var path = require('path');
// 创建中间函数减少嵌套
var server = http.createServer(function(req, res) {
  getTitles(res)
}).listen(8000, '127.0.0.1');

function getTitles (res) {
  fs.readFile(path.join(__dirname, './title.json'), function(err, data) {
    if (err) {
      hadError(err, res);
    }
    else {
      getTemplate(JSON.parse(data.toString(), res));
    }
  })

}

function getTemplate(title, res) {
  fs.readFile(path.join(__dirname, './template.html'), function(err, data){
    if (err) {
      hadError(err, res);
    } else {
      formateHtml(title, data.toString(), res)
    }
  })
}

function formateHtml(title, tmpl, res) {
  var html = tmpl.replace('%', '<li></li>');
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
}

function hadError(err, res) {
  console.error(err);
  res.end('server error');
}