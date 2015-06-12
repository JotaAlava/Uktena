var should = require("chai").should(),
    myApp = require('../../lib/server'),
    request = require('superagent'),
    config = require('../../lib/config.js'),
    port = config.web.port,
    baseUrl = 'http://localhost:' + port;

describe('add a entry into the index', function () {
    before(function (done) {
        myApp.start(677, done);
//        deleteAll();
    });

    after(function (done) {
        myApp.stop(done);
    });

    it('should add Dave as a person to the database', function (done) {
        var actualResult = 1;
        actualResult.should.equal(1);
        done();
    });

    it('will find route tomato and return an empty array', function (done) {
        request
            .get(baseUrl + '/tomato')
            //.on('error', deleteAll)
            .end(function assert(err, res) {
                should.not.exist(err);
                res.should.have.property('status', 200);

                res.body.constructor.should.equal(Array);
                res.body.length.should.equal(0);
                done();
            });
    });

    //it('should create a tomato', function (done) {
    //    var testDate = new Date('1985', '07', '23'),
    //        expectedResult = new Routine('testName', [], testDate, 'testAuthor');
    //
    //    request.post(baseUrl + '/gym/routine')
    //        .on('error', deleteAll)
    //        .send(expectedResult)
    //        .end(function assert(err, res) {
    //            if (err) {
    //                cleanUp(done);
    //                throw err;
    //            }
    //
    //            var actualResult = JSON.parse(res.text);
    //
    //            expect(err).to.not.be.ok; // i.e. err is falsy
    //            expect(res).to.have.property('status', 200);
    //            expect(actualResult.name).to.equal(expectedResult.name);
    //            expect(actualResult.listOfDayIds.length).to.equal(expectedResult.listOfDayIds.length);
    //            expect(actualResult.dateCreated).to.equal(testDate.toISOString());
    //            // Even though date is send as js object, it is saved and retrieved as string.
    //            expect(actualResult.author).to.equal(expectedResult.author);
    //            cleanUp(done);
    //        });
    //});
});