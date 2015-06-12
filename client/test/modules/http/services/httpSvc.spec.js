/**
 * Created by Jose on 5/2/2015.
 */
/**
 * Created by Jose on 4/11/2015.
 */
'use strict';
var httpSvc, sandbox, fakePromise, $http,
    testEndPoint = 'testBaseRoute/someEndPoint',
    testBaseUrl = 'http://localhost:3579/';

describe("httpSvc", function () {
    beforeEach(module('uktenaHttp'));

    beforeEach(inject(function ($injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $http = $injector.get('$httpBackend');
        httpSvc = $injector.get('httpSvc');
    }));

    afterEach(function () {
        sandbox.restore();
    });

    describe('requestWithoutData. i.e: GET', function () {
        it('should be exposed.', function () {
            httpSvc.requestWithoutData.should.be.ok;
        });

        it('should return a promise.', function () {
            // Arrange
            $http.whenGET(testBaseUrl + testEndPoint).respond(fakePromise);

            // Act
            var actualResult = httpSvc.requestWithoutData('get', testEndPoint);
            $http.flush();

            // Assert
            actualResult.success.should.be.ok;
            actualResult.error.should.be.ok;
        });
    });

    it('should expose a method to make a request with data as body. i.e: POST', function () {
        httpSvc.requestWithDataAsBody.should.be.ok;
    });

    it('should expose a method to make a request with data as query string parameters. i.e: POST', function () {
        httpSvc.requestWithDataAsQueryString.should.be.ok;
    });
});