/**
 * Created by Jose on 6/6/2015.
 */
describe('logInCtrl', function(){
    var scope, ctrl, sandbox, $interval, authSvc, $state;
    beforeEach(module('uktena'));

    beforeEach(inject(function($controller, $rootScope, $injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        authSvc = $injector.get('authSvc');
        $state = $injector.get('$state');
        scope = $rootScope.$new();
        ctrl = $controller('logInCtrl', { $scope: scope });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('exposes a submit method that will call the logInSvc', function() {
        // Arrange
        sandbox.stub(authSvc, 'logIn');

        // Act
        scope.logIn();

        // Assert
        expect(authSvc.logIn.calledOnce).to.equal(true);
    });
});