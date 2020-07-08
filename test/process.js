const path = require('path');
const fs = require('fs');
var argv = process.argv;

var daima = argv.splice(2);
var commend = daima.shift();
var taskdescription = daima.join(' ');
// console.log('platform', process.platform)
var file = path.join(process.cwd(), './tasks');
// console.log(argv);
// console.log(argv.splice(2));
switch(commend){
  case 'list':
    listTasks(file);
    break;
  case 'add':
    addTasks(file, taskdescription);
    break;
  default:
    console.log('usage: ' + argv[0] + 'list | add[taskdescription]')
}

function loadingOrInitializationTaskArray(file, cb) {
  fs.stat(file, function(err, stats){
    var tasks = [];
    if (stats) {
      fs.readFile(file, 'utf8', function(err, data) {
        if (err) { throw err };
        var data = data.toString();
        var tasks = JSON.parse(data || '{}');
        cb(tasks);
      })
    } else {
      cb({})
    }
  })
}

function listTasks(file) {
  loadingOrInitializationTaskArray(file, function(tasks) {
    for (var i in tasks) {
      console.log(tasks[i]);
    }
  })
}

function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.parse(tasks), 'utf8', function(err) {
    if (err) throw err;
  })
}

function addTasks(file, taskdescription) {
  loadingOrInitializationTaskArray(file, function(tasks) {
    tasks.push(taskdescription);
    storeTasks(file, tasks);
  })
}