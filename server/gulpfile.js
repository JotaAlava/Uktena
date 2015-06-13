/**
 * Created by Jose on 6/11/2015.
 */
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var print = require('gulp-print');

gulp.task('test', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe(print())
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('watch', function () {
    gulp.watch(['./tests/**/*.js', './lib/**/*.js'], ['test']);
});