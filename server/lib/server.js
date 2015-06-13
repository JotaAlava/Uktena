var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    MongoRepo = require('./dal/mongoRepo'),
    tomatoDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.tomatoCollection);

var app = express();
var server;

// Configure delivery of CSS and Html files
app.use(express.static(__dirname + '/public'));

// Start routes...
require('./config/routes')(app, tomatoDb, bodyParser);

// Method exposed for testing
var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

// Method exposed for testing
var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

// Start the server
server = app.listen(config.web.port);
console.log('server has strated at: ' + config.web.port);