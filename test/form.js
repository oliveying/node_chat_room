const fs = require('fs');
const http = require('http');
const join = require('path').join;
const parse = require('url').parse;
const qs = require('querystring');
var items = [];
var server = http.createServer(function(req, res) {
  var url = parse(req.url);

  var path = url.pathname;
  console.log(path)
  if (path === '/') {
    switch(req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break
      default:
        badRequest(res);
    }
  } else {
    notFund(res);
  }
});
server.listen(3000, function() {
  console.log('start port 3000')
})

function show(res) {
  var body = '<ul>';
  var html = items.map(function(node) {
    return `<li>${node}</li>`
  })
  body +=html;
  body+='<ul>'
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}
function add(req, res) {
  var body = '';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    body+=chunk;
  })
  req.on('end', function(){
    var obj = qs.parse(body);
    console.log(obj, 'obj')
    items.push(obj.item);
    show(res);
  })
}
function notFund(res) {
  res.statusCode = 404;
  res.end('this is notfund')
}
function badRequest(res) {
  res.statusCode = 404;
  res.end('this is method badRequest')
}