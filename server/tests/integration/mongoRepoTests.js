/**
 * Created by Jose on 6/13/2015.
 */
var config = require('../../lib/config'),
    should = require("chai").should(),
    UserCtor = require('../../lib/models/user'),
    MongoRepo = require('../../lib/dal/mongoRepo'),
    q = require('q'),
    userDb = new MongoRepo(config.mongoConnectionString, config.uktenaDb, config.userCollection);


describe('mongoRepository', function () {
    var deleteAll = function () {
        userDb.removeAll();
    };

    // We need both cleanups in case something goes really wrong mid test.
    before(function () {
        deleteAll();
    });

    after(function () {
        deleteAll();
    });

    it('will create a user', function (done) {
        // Arrange
        var testUsername = 'testUsername',
            testPwd = 'testPwd',
            expectedResult = new UserCtor(testUsername, testPwd);

        // Act
        userDb.insert(expectedResult, function (error, result) {
            // Assert
            userDb.findOne({username:testUsername}, function (err, res) {
                res.username.should.equal(expectedResult.username);
                res.password.should.equal(expectedResult.password);
            });
        });

        done();
    });

    it('will retrieve a user by username', function (done) {
        // Arrange
        var testUsername = 'testUsername',
            testUsername2 = 'testUsername2',
            testPwd = 'testPwd',
            expectedResult = new UserCtor(testUsername, testPwd),
            dummyUser = new UserCtor(testUsername2, testPwd);

        // Act
        userDb.insert([expectedResult, dummyUser, dummyUser, dummyUser], function (error, result) {
            // Assert
            userDb.findOne({username:testUsername}, function (err, actualResult) {
                actualResult.username.should.equal(expectedResult.username);
                actualResult.password.should.equal(expectedResult.password);
            });
        });

        done();
    });

    // TODO: Find an easy way to integration test this repo wihtout the headache of async crazyness
    //it('will delete user by Id', function (done) {
    //    // Arrange
    //    var testUsername = 'testUsername',
    //        testUsername2 = 'testUsername2',
    //        testPwd = 'testPwd',
    //        expectedResult = new UserCtor(testUsername, testPwd),
    //        dummyUser = new UserCtor(testUsername2, testPwd),
    //        expectedLength = 4,
    //        actualLength = 0;
    //
    //    // Act
    //    userDb.insert([expectedResult, dummyUser, dummyUser, dummyUser], function (error, result) {
    //
    //        userDb.findAll({username:testUsername}, function (err, actualResult) {
    //            // Check that all were chreated
    //            actualLength = actualResult.length;
    //            userDb.removeById({username:testUsername}, function (err, actualResult) {
    //                userDb.findAll({username:testUsername}, function (err, actualResult) {
    //                    // Assert
    //                    actualLength.should.equal(4);
    //                    actualResult.length.should.equal(3);
    //
    //                });
    //
    //            });
    //        });
    //    });
    //
    //    done();
    //});
});