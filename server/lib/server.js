var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    MongoRepo = require('./dal/mongoRepo'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    tomatoDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.tomatoCollection),
    userDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.userCollection);

var cookieParser = require('cookie-parser');
var app = express();
var server;

// Configure delivery of CSS and Html files
app.use(express.static('./../../client/'));
app.use(cookieParser());
app.use(session({secret:'1'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Authentication configurations
passport.use(new LocalStrategy(
    function (username, password, done) {
        userDb.findOne({username:username}, function (err, user) {
            if (user) {
                return done(null, user);
            } else{
                done(null, false);
            }
        })
    }
));

// Start routes...
require('./modules/expressModule')(app, tomatoDb, 'tomato');
require('./modules/expressModule')(app, userDb, 'user');

app.post('/login', function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err === null && !user) {
            return next('Invalid credentials!')
        }
        if(!err) {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.send({user:user});
            });
        }
    });

    auth(req, res, next);
});

app.post('/logout', function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err === null && !user) {
            return next('Invalid credentials!')
        }
        if(!err) {
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.send({user:user});
            });
        }
    });

    auth(req, res, next);
});

passport.serializeUser(function (user, done) {
    if(user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function (userId, done) {
    userDb.findOne({_id:userId}, function (err, user) {
        if (user) {
            return done(null, user);
        } else{
            done(null, false);
        }
    })
});

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