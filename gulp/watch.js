console.log('this is watch')

const { watch } = require('gulp');
function watch (fcb) {
  watch(['node/*.html', '!node/template.html'], function(cb) {
    cb();
  })
  fcb();
}

// exports.watch = watch;
exports.default = watch;