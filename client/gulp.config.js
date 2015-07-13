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
        locationOfIndexHtml: './client/index.html',
        destinationOfWiredepedFile: './client/index.html',
        allTheJs: '../client//js/**/*.js',
        allTheTestsJs: '../client/**/*.js'
    };

    return config;
};