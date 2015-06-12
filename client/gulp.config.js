/**
 * Created by Jose on 5/2/2015.
 */
module.exports = function() {
    var config = {
        wiredepOptions: {
            bowerJson: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: ''
        },
        locationOfIndexHtml: './index.html',
        destinationOfWiredepedFile: './',
        allTheJs: './js/**/*.js',
        allTheTestsJs: './test/**/*.js'
    };

    return config;
};