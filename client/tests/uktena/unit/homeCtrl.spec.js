/**
 * Created by Jose on 6/6/2015.
 */
describe('homeCtrl', function(){
    var scope, ctrl, sandbox, $interval, timerSvc, $state;
    beforeEach(module('uktena'));

    beforeEach(inject(function($controller, $rootScope, $injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        timerSvc = $injector.get('timerSvc');
        $state = $injector.get('$state');
        scope = $rootScope.$new();
        ctrl = $controller('homeCtrl', { $scope: scope });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('timeLeft will get remamining time from the service', function() {
        // Arrange
        sandbox.stub(timerSvc, 'getPrettyTimeLeft');

        // Act
        scope.timeLeft();

        // Assert
        expect(timerSvc.getPrettyTimeLeft.calledOnce).to.equal(true);
    });

    it('start method will also call setTimerLength to execute the latest selected timer', function() {
        // Arrange
        sandbox.stub(timerSvc, 'setTimerLength');

        // Act
        scope.startTimer();

        // Assert
        expect(timerSvc.setTimerLength.calledOnce).to.equal(true);
    });

    // TODO: Figure out how to verify that the methods are called in the expected order

    it('timeLeft will NOT stop the timer if the value from the service is at 0:01', function() {
        // Arrange
        sandbox.stub(timerSvc, 'getPrettyTimeLeft').returns('0:01');
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        scope.timeLeft();

        // Assert
        expect(timerSvc.getPrettyTimeLeft.calledOnce).to.equal(true);
        expect(timerSvc.stopTimer.notCalled).to.equal(true);
    });

    it('timeLeft will NOT stop the timer if the value from the service is at 45:00', function() {
        // Arrange
        sandbox.stub(timerSvc, 'getPrettyTimeLeft').returns('45:00');
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        scope.timeLeft();

        // Assert
        expect(timerSvc.getPrettyTimeLeft.calledOnce).to.equal(true);
        expect(timerSvc.stopTimer.notCalled).to.equal(true);
    });

    it('timeLeft will NOT stop the timer if the value from the service is at 25:00', function() {
        // Arrange
        sandbox.stub(timerSvc, 'getPrettyTimeLeft').returns('25:00');
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        scope.timeLeft();

        // Assert
        expect(timerSvc.getPrettyTimeLeft.calledOnce).to.equal(true);
        expect(timerSvc.stopTimer.notCalled).to.equal(true);
    });

    it('short break will call setTimerLength with value 300000 (5 minutes in milliseconds)', function() {
        // Arrange
        sandbox.stub(timerSvc, 'setTimerLength');

        // Act
        scope.shortBreak();

        // Assert
        expect(timerSvc.setTimerLength.withArgs(300000).calledOnce).to.equal(true);
    });

    it('short break will call stopTimer', function() {
        // Arrange
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        scope.shortBreak();

        // Assert
        expect(timerSvc.stopTimer.calledOnce).to.equal(true);
    });

    it('short break will call startTimer', function() {
        // Arrange
        sandbox.stub(timerSvc, 'startTimer');

        // Act
        scope.shortBreak();

        // Assert
        expect(timerSvc.startTimer.calledOnce).to.equal(true);
    });

    it('longBreak will call setTimerLength with value 900000 (15 minutes in milliseconds)', function() {
        // Arrange
        sandbox.stub(timerSvc, 'setTimerLength');

        // Act
        scope.longBreak();

        // Assert
        expect(timerSvc.setTimerLength.withArgs(900000).calledOnce).to.equal(true);
    });

    it('longBreak will call stopTimer', function() {
        // Arrange
        sandbox.stub(timerSvc, 'stopTimer');

        // Act
        scope.longBreak();

        // Assert
        expect(timerSvc.stopTimer.calledOnce).to.equal(true);
    });

    it('longBreak will call startTimer', function() {
        // Arrange
        sandbox.stub(timerSvc, 'startTimer');

        // Act
        scope.longBreak();

        // Assert
        expect(timerSvc.startTimer.calledOnce).to.equal(true);
    });
});