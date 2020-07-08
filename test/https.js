const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key: fs.readFileSync(path.join(__dirname, './key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './key-cert.pem'))
}
var server = https.createServer(options, function(req, res) {
  res.end('hello this is https')
  
  // res.setHeader('Content-Type', 'text/html');
  // res.statusCode = 301;
  
});
server.listen(3000, function() {
  console.log('listening 3000');
})