/**
 * Created by Jose on 3/27/2015.
 */
    var mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient;

// One db per object
var mongoRepository = function (mongoConnectionString, nameOfDb, optionalNameOfCollection) {
    var self = this,
        dbName = nameOfDb,
        connectionString = mongoConnectionString + dbName,
        collectionName = optionalNameOfCollection;

    self.findAll = function (res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).find().toArray(function (err, queryResult) {
                res.send(queryResult);
                db.close();
            });
        });
    };

    self.findOne = function (query, res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).findOne(query, function (err, queryResult) {
                console.log('Found none with that query: ' + queryResult);
                console.log(queryResult);
                res.send(queryResult);
                db.close();
            });
        });
    };

    self.findById = function (id, res) {
        self.findOne({_id : new mongodb.ObjectID(id)}, res);
    };

    self.getCount = function (res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).count(function (err, queryResult) {
                console.log('Count is: ' + queryResult);
                res.send(queryResult.toString());
                db.close();
            });
        });
    };

    self.insert = function (documentToAdd, res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).insert(documentToAdd, function (err, queryResult) {
                var documentAdded = queryResult.ops[0];
                console.log('Document added is ' + documentAdded);
                res.send(documentAdded);
                db.close();
            });
        });
    };

    self.update = function (documentToUpdate, res) {
        // Figure out a proper way of doing whole collection updates, avoid using delete keyword.
        var idOfDocumentToUpdate = new mongodb.ObjectID(documentToUpdate._id);
        delete documentToUpdate._id;

        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).update({_id : idOfDocumentToUpdate}, { $set: documentToUpdate }, function (err, queryResult) {
                console.log('Document added is ' + documentToUpdate);
                res.send(documentToUpdate);
                db.close();
            });
        });
    };

    self.remove = function (documentToDelete, res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).remove({_id : new mongodb.ObjectID(documentToDelete._id)}, function (err, queryResult) {
                console.log('Document deleted is ' + documentToDelete);
                res.send(documentToDelete);
                db.close();
            });
        });
    };

    self.removeById = function (idOfDocumentToDelete, res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).remove({_id : new mongodb.ObjectID(idOfDocumentToDelete)}, function (err, queryResult) {
                console.log('Document deleted had an id of: ' + idOfDocumentToDelete);
                res.send(idOfDocumentToDelete);
                db.close();
            });
        });
    };

    self.removeAll = function (res) {
        mongoClient.connect(connectionString, function (err, db) {
            db.collection(collectionName || dbName).remove({}, function (err, queryResult) {
                console.log('All documents have been deleted!');
                res.send('All documents have been deleted!');
                db.close();
            });
        });
    };

    return self;
};

module.exports = mongoRepository;