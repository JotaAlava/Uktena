/**
 * Created by Jose on 6/13/2015.
 */
var _ = require('underscore');

module.exports = function (app, dbToUse, baseRoute, options) {
    if (_.contains(options.capability, 'R')) {
        app.get('/' + baseRoute, function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.find(req.query, function (err, result) {
                        res.send(result);
                    });
                } else {
                    res.send(401);
                }
            });
        });

        app.get('/' + baseRoute + '/:id', function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.findById(req.params.id, function (err, result) {
                        res.send(result);
                    });
                } else {
                    res.send(401);
                }
            });
        });
    }

    if (_.contains(options.capability, 'r')) {
        app.get('/' + baseRoute + '/:id', function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.findById(req.params.id, function (err, result) {
                        res.send(result);
                    });
                } else {
                    res.send(401);
                }
            });
        });
    }

    if (_.contains(options.capability, 'c')) {
        app.post('/' + baseRoute, function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.insert(req.body, function (err, queryResult) {
                        res.send(queryResult.ops);
                    });
                } else {
                    res.send(401);
                }
            });
        });
    }

    if (_.contains(options.capability, 'u')) {
        app.put('/' + baseRoute, function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.update(req.body, res);
                } else {
                    res.send(401);
                }
            });
        });
    }

    if (_.contains(options.capability, 'd')) {
        app.delete('/' + baseRoute + '/:id', function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    if (req.body.hasOwnProperty('_id')) {
                        dbToUse.removeById(req.body._id, res);
                    } else {
                        dbToUse.removeAll(res);
                    }
                } else {
                    res.send(401);
                }
            });
        });
    }

    if (_.contains(options.capability, 'D')) {
        app.delete('/' + baseRoute, function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    dbToUse.remove(req.body, res);
                } else {
                    res.send(401);
                }
            });
        });

        app.delete('/' + baseRoute + '/:id', function (req, res) {
            options.authPredicate(req.headers.uktena).then(function (isAuth) {
                if(isAuth) {
                    if (req.body.hasOwnProperty('_id')) {
                        dbToUse.removeById(req.body._id, res);
                    } else {
                        dbToUse.removeAll(res);
                    }
                } else {
                    res.send(401);
                }
            });
        });
    }
};