/**
 * Created by Jose on 6/13/2015.
 */
module.exports = function (app, tomatoDb, bodyParser) {
    app.use(bodyParser.json());

    app.get('/tomato', function (req, res) {
        tomatoDb.findAll(res);
    });

    app.get('/gym/routine/:id', function (req, res) {
        tomatoDb.findById(req.params.id, res);
    });

    app.post('/tomato', function (req, res) {
        tomatoDb.insert(req.body, res);
    });

    app.put('/gym/routine', function (req, res) {
        tomatoDb.update(req.body, res);
    });

    app.delete('/tomato', function (req, res) {
        tomatoDb.remove(req.body, res);
    });

    app.delete('/tomato/:id', function (req, res) {
        if (req.body.hasOwnProperty('_id')) {
            tomatoDb.removeById(req.body._id, res);
        } else {
            tomatoDb.removeAll(res);
        }
    });
};