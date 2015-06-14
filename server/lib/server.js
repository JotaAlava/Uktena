var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    MongoRepo = require('./dal/mongoRepo'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    tomatoDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.tomatoCollection),
    userDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.userCollection);

var app = express();
var server;

// Configure delivery of CSS and Html files
app.use(express.static('./../../client/'));

// Authentication configurations
passport.use(new LocalStrategy(
    function (username, password, done) {
        userDb.findOne({username:username})
    }
));

// Start routes...
require('./modules/expressModule')(app, tomatoDb, bodyParser, 'tomato');
require('./modules/expressModule')(app, userDb, bodyParser, 'user');

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