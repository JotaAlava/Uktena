var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    MongoRepo = require('./dal/mongoRepo'),
    passport = require('passport'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy,
    tomatoDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.tomatoCollection),
    userDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.userCollection),
    q = require('q'),
    favicon = require('serve-favicon'),
    path = require('path'),
    crypto = require('crypto'),
    validator = require('validator');

var cookieParser = require('cookie-parser');
var app = express();
var server;

// Configure delivery of CSS and Html files
app.use(favicon(__dirname + '/favicon.ico'));
app.use(express.static(path.join(__dirname, '../../client')));
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
function isValidHeader(header){
    var result = q.defer();

    userDb.findById(header, function (err, user) {
        if (user) {
            result.resolve(true);
        } else{
            result.resolve(false);
        }
    });

    return result.promise;
}

require('./modules/expressModule')(app, userDb, 'user', {
    authPredicate: isValidHeader,
    capability: 'cr'
});
require('./modules/expressModule')(app, tomatoDb, 'tomato', {
    authPredicate: isValidHeader,
    capability: 'cRud'
});

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

app.post('/register', function (req, res, next) {
    userDb.findOne({username:req.body.username}, function (err, user) {
        if (!user && req.body.username && req.body.password && req.body.passwordSecret && validator.isEmail(req.body.username)) {
            var salt = createSalt();
            var securePwd = hasPwd(salt, req.body.password);

            req.body.password = securePwd;

            userDb.insert(req.body, function (err, queryResult) {
                res.send(queryResult.ops[0]);
            });
        } else{
            res.status(400);
            res.send('User has already registered!');
        }
    });
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

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hasPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}

// Start the server
server = app.listen(process.env.PORT || 3030, function () {
    console.log('Dir name is ' + path.join(__dirname, '../../client'));
    console.log('server has started at: ' + server.address().port);
    console.log('System running in: ' + config.env  + ' environment.');
});