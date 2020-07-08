const fs = require('fs');
const http = require('http');
const formidable = require('formidable');
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
        upload(req, res);
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
  var html = '<form action="/" method="post" enctype="multipart/form-data">'
  + '<input type="text" name="name">'
  + '<input type="file" name="file">'
  + '<input type="submit" value="submit">'
  + '</form>'
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
}
function upload(req, res) {
  if (!isFormData(req)) {
    res.statusCode = 400;
    res.end('is not form multipart/form-data')
    return;
  }
  var form = new formidable.IncomingForm();
  // form.on('field', function(field, value) {
  //   console.log('field', field, value)
  // })
  // form.on('file', function(name, file) {
  //   console.log('file', name, file)
  // })
  // form.on('end', function() {
  //   res.end('complete')

  // })
  var percent = 0;
  form.on('progress', function(bytesReceived, bytesExpected){
    percent = Math.floor(bytesReceived/bytesExpected * 100)
    console.log(percent)
  })
  form.parse(req, function(err, fields, fileds) {
    console.log(1, fields, 2, fileds);
    res.end(percent + ' complete');
  });
}
function isFormData(req) {
  var contentType = req.headers['content-type'] || '';
  return 0 == contentType.indexOf('multipart/form-data');
}
// function add(req, res) {
//   var body = '';
//   req.setEncoding('utf8');
//   req.on('data', function(chunk) {
//     body+=chunk;
//   })
//   req.on('end', function(){
//     var obj = qs.parse(body);
//     console.log(obj, 'obj')
//     items.push(obj.item);
//     show(res);
//   })
// }
function notFund(res) {
  res.statusCode = 404;
  res.end('this is notfund')
}
function badRequest(res) {
  res.statusCode = 404;
  res.end('this is method badRequest')
}