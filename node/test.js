const fs = require('fs');
const path = require('path');

const readStream = fs.createReadStream(path.join(__dirname, '../test/test.js'), {encoding: 'utf8'});
//读取文件发生错误事件
readStream.on('error', (err) => {
  console.log('发生异常:', err);
});
//已打开要读取的文件事件
readStream.on('open', (fd) => {
  console.log('文件已打开:', fd);
});
//文件已经就位，可用于读取事件
readStream.on('ready', () => {
  console.log('文件已准备好..');
});

//文件读取中事件·····
readStream.on('data', (chunk) => {
  console.log('读取文件数据:', chunk);
});

//文件读取完成事件
readStream.on('end', () => {
  console.log('读取已完成..');
});

//文件已关闭事件
readStream.on('close', () => {
  console.log('文件已关闭！');
})
