var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    MongoRepo = require('./dal/mongoRepo'),
    routineDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.tomatoCollection);

var app = express();
var server;

app.use(bodyParser.json());

var start = exports.start = function start(port, callback) {
    server = app.listen(port, callback);
};

var stop = exports.stop = function stop(callback) {
    server.close(callback);
};

app.use(express.static(__dirname + '/public'));

app.get('/tomato', function (req, res) {
    routineDb.findAll(res);
});

app.get('/gym/routine/:id', function (req, res) {
    routineDb.findById(req.params.id, res);
});

app.post('/gym/routine', function (req, res) {
    routineDb.insert(req.body, res);
//    res.status(403)        // HTTP status 404: NotFound
//        .send('Not found');
});

app.put('/gym/routine', function (req, res) {
    routineDb.update(req.body, res);
});

app.delete('/gym/routine', function (req, res) {
    routineDb.remove(req.body, res);
});

app.delete('/gym/routine/:id', function (req, res) {
    if (req.body.hasOwnProperty('_id')) {
        routineDb.removeById(req.body._id, res);
    } else {
        routineDb.removeAll(res);
    }
});

server = app.listen(config.web.port);

console.log('server has strated at: ' + config.web.port);