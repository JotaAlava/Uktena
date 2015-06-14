/**
 * Created by Jose on 6/13/2015.
 */
module.exports = function (app, dbToUse, bodyParser, baseRoute) {
    app.use(bodyParser.json());

    app.get('/' + baseRoute, function (req, res) {
        dbToUse.findAll(function (err, result) {
            res.send(result);
        });
    });

    app.get('/' + baseRoute + '/:id', function (req, res) {
        dbToUse.findById(req.params.id, res);
    });

    app.post('/' + baseRoute, function (req, res) {
        dbToUse.insert(req.body, function (err, queryResult) {
            res.send(queryResult.ops);
        });
    });

    app.put('/' + baseRoute, function (req, res) {
        dbToUse.update(req.body, res);
    });

    app.delete('/' + baseRoute, function (req, res) {
        dbToUse.remove(req.body, res);
    });

    app.delete('/' + baseRoute + '/:id', function (req, res) {
        if (req.body.hasOwnProperty('_id')) {
            dbToUse.removeById(req.body._id, res);
        } else {
            dbToUse.removeAll(res);
        }
    });
};