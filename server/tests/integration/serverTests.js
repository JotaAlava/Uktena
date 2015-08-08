var should = require("chai").should(),
    myApp = require('../../lib/server'),
    request = require('superagent'),
    config = require('../../lib/config.js'),
    port = config.web.port,
    baseUrl = 'http://localhost:' + port,
    TomatoCtor = require('../../lib/models/tomato');

describe('tomato service', function () {
    before(function (done) {
        myApp.start(677, done);
        deleteAll();
    });

    after(function (done) {
        deleteAll();
        myApp.stop(done);
    });

    function deleteAll(done) {
        request.del(baseUrl + '/tomato/all')
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                request.get(baseUrl + '/tomato').end(function assert(err, res) {
                    should.not.exist(err);
                    res.should.have.property('status', 200);
                    res.body.length.should.equal(0);

                    if (done) {
                        done();
                    }
                });
            });
    }

    function cleanUp(done) {
        request
            .del(baseUrl + '/tomato/all')
            .on('error', deleteAll)
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                request.get(baseUrl + '/tomato').end(function assert(err, res) {
                    should.not.exist(err);
                    res.should.have.property('status', 200);
                    res.body.length.should.equal(0);
                    done();
                });
            });
    }

    xit('will find route tomato and return an empty array', function (done) {
        request
            .get(baseUrl + '/tomato')
            .on('error', deleteAll)
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                res.body.constructor.should.equal(Array);
                res.body.length.should.equal(0);
                done();
            });
    });

    xit('should create a tomato', function (done) {
        var expectedDescription = 'testDescription',
            expectedDate = new Date(),
            testTomato = new TomatoCtor(expectedDescription, expectedDate);

        request.post(baseUrl + '/tomato')
            .on('error', deleteAll)
            .send(testTomato)
            .end(function assert(err, res) {
                if (err) {
                    cleanUp(done);
                    throw err;
                }

                request
                    .get(baseUrl + '/tomato')
                    .on('error', deleteAll)
                    .end(function assert(err, res) {
                        should.not.exist(err);
                        var actualResult = res.body[0];

                        should.not.exist(err);
                        res.should.have.property('status', 200);

                        actualResult.description.should.equal(expectedDescription);
                        actualResult.dateCreated.should.equal(expectedDate.toISOString());
                        done();
                    });
            });
    });
});

xdescribe('user service', function () {
    var serviceRoute = 'user';

    before(function (done) {
        myApp.start(677, done);
        deleteAll();
    });

    after(function (done) {
        deleteAll();
        myApp.stop(done);
    });

    function deleteAll(done) {
        request.del(baseUrl + '/'+ serviceRoute +'/all')
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                request.get(baseUrl + '/tomato').end(function assert(err, res) {
                    should.not.exist(err);
                    res.should.have.property('status', 200);
                    res.body.length.should.equal(0);

                    if (done) {
                        done();
                    }
                });
            });
    }

    function cleanUp(done) {
        request
            .del(baseUrl + '/' + serviceRoute + '/all')
            .on('error', deleteAll)
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                request.get(baseUrl + '/tomato').end(function assert(err, res) {
                    should.not.exist(err);
                    res.should.have.property('status', 200);
                    res.body.length.should.equal(0);
                    done();
                });
            });
    }

    it('will find route user and return an empty array', function (done) {
        request
            .get(baseUrl + '/' + serviceRoute)
            .on('error', deleteAll)
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                res.body.constructor.should.equal(Array);
                res.body.length.should.equal(0);
                done();
            });
    });

    it('should create a user', function (done) {
        var expectedDescription = 'testDescription',
            expectedDate = new Date(),
            testTomato = new TomatoCtor(expectedDescription, expectedDate);

        request.post(baseUrl + '/' + serviceRoute)
            .on('error', deleteAll)
            .send(testTomato)
            .end(function assert(err, res) {
                if (err) {
                    cleanUp(done);
                    throw err;
                }

                var actualResult = JSON.parse(res.text);

                should.not.exist(err);
                res.should.have.property('status', 200);
                actualResult.description.should.equal(expectedDescription);

                actualResult.dateCreated.should.equal(expectedDate.toISOString());
                done();
            });
    });
});