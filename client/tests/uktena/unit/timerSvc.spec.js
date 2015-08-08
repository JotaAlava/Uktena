/**
 * Created by Jose on 5/2/2015.
 */
/**
 * Created by Jose on 4/11/2015.
 */
'use strict';
var timerSvc, sandbox, fakePromise, $interval, $state,
    testEndPoint = 'testBaseRoute/someEndPoint',
    testBaseUrl = 'http://localhost:3579/';

describe("timerSvc", function () {
    beforeEach(module('uktena'));

    beforeEach(inject(function ($injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        timerSvc = $injector.get('timerSvc');
        $state = $injector.get('$state');
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('exposes a start method', function () {
        timerSvc.startTimer.should.be.ok;
    });

    it('timerLength is 25 minutes by default', function () {
        // Arrange
        var expectedResult = 1500000;

        // Act
        var actualResult = timerSvc.getTimerLength();

        // Assert
        actualResult.should.equal(expectedResult);
    });

    it('timeout promise starts out null', function () {
        // Act
        var actualResult = timerSvc.getTimeoutPromise();

        // Assert
        expect(actualResult).to.be.a('null');
    });

    it('startTimer calls interval and populates the promise with a $timeout promise', function () {
        // Act
        timerSvc.startTimer();
        $interval.flush();
        var actualResult = timerSvc.getTimeoutPromise();

        // Assert
        actualResult.should.be.ok;
        // Will not go into testing the details of the object because I assume the angular team tested the shit out of $timeout
    });

    it('startTimer will activate the flag isRunning', function () {
        // Act
        timerSvc.startTimer();

        // Assert
        timerSvc.isRunning().should.equal(true);
        // Will not go into testing the details of the object because I assume the angular team tested the shit out of $timeout
    });

    it('stopTimer will de-activate the flag isRunning', function () {
        // Act
        timerSvc.startTimer();
        timerSvc.stopTimer();

        // Assert
        timerSvc.isRunning().should.equal(false);
        // Will not go into testing the details of the object because I assume the angular team tested the shit out of $timeout
    });

    it('stopTimer will navigate to the tomato screen after timer is up', function () {
        // TODO: Figure out how to test async callback exection. NOTE: This is key for testing server side code as well!
    });

    it('stopTimer will stop the timer if the value from the service is at 0', function () {
        // TODO: Figure out how to test async callback exection. NOTE: This is key for testing server side code as well!
    });

    it('isRunning will return a flag that tracks if the timer has been started or not - by default is false', function () {
        // Act
        var actualResult = timerSvc.isRunning();

        // Assert
        actualResult.should.equal(false);
        // Will not go into testing the details of the object because I assume the angular team tested the shit out of $timeout
    });

    it('formats the milliseconds as expected', function () {
        // Act
        var actualResult = timerSvc.getPrettyTimeLeft();

        // Assert
        actualResult.should.equal('25:00');
        // Will not go into testing the details of the object because I assume the angular team tested the shit out of $timeout
    });

    it('setTimerLength will update the timer length', function () {
        // Arrange
        var expectedResult = 1499000;

        // Act
        timerSvc.setTimerLength(expectedResult);

        // Assert
        var actualResult = timerSvc.getPrettyTimeLeft();
        actualResult.should.equal('24:59');
    });

    it('startTimer will first call stop to void parallel intervals from running', function () {
        // Arrange
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        timerSvc.startTimer();

        // Assert
        expect(timerSvc.stopTimer.withArgs().calledOnce).to.equal(true);
    });
});