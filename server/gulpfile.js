/**
 * Created by Jose on 5/2/2015.
 */
var gulp = require('gulp'),
    karma = require('karma').server,
    config = require('./../client/gulp.config.js')(),
    $ = require('gulp-load-plugins')({lazy: true}),
    args = require('yargs').argv;

//var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
//var print = require('gulp-print');

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    console.log("Tests broken due to: https://github.com/chieffancypants/angular-loading-bar/issues/123")
    karma.start({
        configFile: __dirname + '/../client/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.allTheJs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

/**
 * Wire the client side dependencies into the index.html
 */
gulp.task('wiredep', function () {
    // TODO: Fix this task!
    console.log('this is broken!')
    console.log('fix it')
    //var wiredep = require('wiredep').stream,
    //    //options = config.getWiredepDefaultOptions();
    //    options = config.wiredepOptions;
    //log('starting wiredep');
    //return gulp
    //    .src(config.locationOfIndexHtml) // Find the html we will throw into the pipeline
    //    .pipe(wiredep(options))
    //    .pipe($.inject(gulp.src(config.allTheJs), {relative: true}))
    //    .pipe(gulp.dest(config.destinationOfWiredepedFile)); // Dump the resulting file into this folder
});

gulp.task('watch', function () {
    gulp.watch([config.allTheJs, config.allTheTestsJs], ['test']);
});

gulp.task('serverTest', function() {
    return gulp.src(['tests/**/*.js'], { read: false })
        .pipe($.print())
        .pipe($.mocha({ reporter: 'list' }))
        .on('error', gutil.log);
});

gulp.task('serverWatch', function () {
    gulp.watch(['./tests/**/*.js', './lib/**/*.js'], ['test']);
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}