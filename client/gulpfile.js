/**
 * Created by Jose on 5/2/2015.
 */
var gulp = require('gulp'),
    karma = require('karma').server,
    config = require('./gulp.config.js')(),
    $ = require('gulp-load-plugins')({lazy: true}),
    args = require('yargs').argv;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
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
    var wiredep = require('wiredep').stream,
        //options = config.getWiredepDefaultOptions();
        options = config.wiredepOptions;
    log('starting wiredep');
    return gulp
        .src(config.locationOfIndexHtml) // Find the html we will throw into the pipeline
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.allTheJs), {relative: true}))
        .pipe(gulp.dest(config.destinationOfWiredepedFile)); // Dump the resulting file into this folder
});

gulp.task('watch', function () {
    gulp.watch([config.allTheJs, config.allTheTestsJs], ['test']);
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