const http = require('http');
const url = require('url');

// 模拟服务器端的数据
var data = {name: 'duruo', age: 22};

 // 保存URL解析后的数据，保存从请求中解析出来的回调函数名

var reqUrl, callbackName;
http.createServer(function(req, res) {
  reqUrl = url.parse(req.url);
  callbackName = reqUrl.query.split('=')[1];
  res.writeHead(200, {'Content-Type': 'text/plain'})
  var str = callbackName + `(${JSON.stringify(data)})`
  res.end(str);
}).listen(4000, function() {
  console.log('start cross1')
})