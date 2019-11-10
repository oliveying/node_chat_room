/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

const fs = require('fs');
const gulp = require('gulp');

gulp;

function gfile(file) {
  require('./gulp/' + file);
}

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */

fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(gfile);
