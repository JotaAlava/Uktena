/**
 * Created by Jose on 5/2/2015.
 */
'use strict';
var authSvc, sandbox, fakePromise, $interval, cookieSvc, $http, feedbackSvc,
    testUrl = 'https://secret-plains-7100.herokuapp.com';

describe("authSvc", function () {
    beforeEach(module('uktena'));

    beforeEach(inject(function ($injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        authSvc = $injector.get('authSvc');
        feedbackSvc = $injector.get('feedbackSvc');
        $http = $injector.get('$httpBackend');
        cookieSvc = $injector.get('cookieSvc');
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('will call cookieSvc to get cookie', function () {
        // Arrange
        sandbox.stub(cookieSvc, 'get');

        // Act
        authSvc.isAuthenticated();

        // Assert
        expect(cookieSvc.get.calledOnce).to.equal(true);
    });

    it('will call cookieSvc to create cookie after calling Log In', function () {
        // Arrange
        $http.expectPOST(testUrl + '/login').respond({user: {_id:42}});
        var stub = sandbox.stub(cookieSvc, 'set');
        var stub2 = sandbox.stub(feedbackSvc, 'notify');
        var dummyParams = {
            username: 'test',
            password: 'test'
        };
        var dummyPredicate = function () {
            console.log('hello world!')
        };

        // Act
        authSvc.logIn(dummyParams, dummyPredicate);
        $http.flush();

        // Assert
        expect(stub.withArgs(42).called).to.equal(true);
    });

    it('will notify the user after log in is successful', function () {
        // Arrange
        $http.whenPOST(testUrl + '/login').respond({user: {_id:42}});
        var stub = sandbox.stub(feedbackSvc, 'notify');
        var stub2 = sandbox.stub(cookieSvc, 'set');
        var dummyParams = {
            username: 'test',
            password: 'test'
        };
        var dummyPredicate = function () {
            console.log('hello world!')
        };

        // Act
        authSvc.logIn(dummyParams, dummyPredicate);
        $http.flush();

        // Assert
        expect(stub.called).to.equal(true);
    });

    it('will call the feedbackSvc when the ajax request returns an error', function () {
        // Arrange
        $http.whenPOST(testUrl + '/login').respond(500);
        var stub = sandbox.stub(feedbackSvc, 'notify');
        var dummyParams = {
            username: 'test',
            password: 'test'
        };
        var dummyPredicate = function () {
            console.log('hello world!')
        };

        // Act
        authSvc.logIn(dummyParams, dummyPredicate);
        $http.flush();

        // Assert
        expect(stub.called).to.equal(true);
    });
});