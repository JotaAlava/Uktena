/**
 * Created by Jose on 6/6/2015.
 */
describe('navCtrl', function () {
    var scope, ctrl, sandbox, $interval, authSvc, $state, jQuerySvc;
    beforeEach(module('uktena'));

    beforeEach(inject(function ($controller, $rootScope, $injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $interval = $injector.get('$interval');
        authSvc = $injector.get('authSvc');
        jQuerySvc = $injector.get('jQuerySvc');
        $state = $injector.get('$state');
        scope = $rootScope.$new();
        ctrl = $controller('navCtrl', {$scope: scope});
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('is authenticated will call the authSvc to verify if the user is logged in', function () {
        // Arrange
        sandbox.stub(authSvc, 'isAuthenticated');

        // Act
        scope.isAuthenticated();

        // Assert
        expect(authSvc.isAuthenticated.calledOnce).to.equal(true);
    });
});