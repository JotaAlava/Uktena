/**
 * Created by Jose on 6/6/2015.
 */
describe('tomatoesCtrl', function(){
    var scope, ctrl, sandbox, $timeout, timerSvc, $state, $httpBackend;
    beforeEach(module('uktena'));

    beforeEach(inject(function($controller, $rootScope, $injector) {
        sandbox = sinon.sandbox.create();
        fakePromise = sinon.stub(generateFakePromise());
        $timeout = $injector.get('$timeout');
        timerSvc = $injector.get('timerSvc');
        $state = $injector.get('$state');
        $httpBackend = $injector.get('$httpBackend');
        scope = $rootScope.$new();
        ctrl = $controller('tomatoesCtrl', { $scope: scope });
    }));

    afterEach(function () {
        sandbox.restore();
    });

    it('listOfTomatoes is exposed to the scope and has default length of 0', function() {
        // Assert
        scope.listOfTomatoes.should.be.ok;
        scope.listOfTomatoes.length.should.equal(0);
    });

    it('createEntry is exposed to the scope', function() {
        // Assert
        scope.createEntry.should.be.ok;
    });

    it('submitEntry when invoked without parameters will toast the user "Description required!"', function() {
        // ...
    });

    it('createEntry will not add a new tomato to the list if isCreating is true', function() {
        // Arrange
        sandbox.stub(scope, 'isCreating').returns(true);

        // Act
        scope.createEntry();

        // Assert
        scope.listOfTomatoes.length.should.equal(0);
    });

    it('isCreating returns the value of the isCreating flag - by default false', function() {
        // Arrange
        var expectedResult = false;

        // Act
        var actualResult = scope.isCreating();

        // Assert
        actualResult.should.equal(expectedResult);
    });

    it('isCreating is set to true by createEntry', function() {
        // Arrange
        var expectedResult = true;

        // Act
        scope.createEntry();
        var actualResult = scope.isCreating();

        // Assert
        actualResult.should.equal(expectedResult);
    });

    it('cancelEntry will set isCreating flag to false', function() {
        // Arrange
        var expectedResult = false;

        // Act
        scope.createEntry();
        scope.cancelEntry();
        var actualResult = scope.isCreating();

        // Assert
        actualResult.should.equal(expectedResult);
    });

    // TODO: Find out if it's possible to test that pop has been called...
    it('cancelEntry will remove the latest addition to the listOfTomatoes', function() {
        // Arrange
        var expectedResult = 0;

        // Act
        scope.createEntry();
        scope.cancelEntry();
        var actualResult = scope.listOfTomatoes.length;

        // Assert
        actualResult.should.equal(expectedResult);
    });

    it('submitEntry will toggle isCreating flag to false after the digest cycle is completed', function() {
        // Arrange
        var expectedResult = false;

        // Act
        scope.createEntry();
        scope.submitEntry('someDescription');
        $httpBackend.expectPOST("http://localhost:667/tomato").respond('test');
        $httpBackend.whenGET("views/main.html").respond('test');

        $timeout.flush();

        var actualResult = scope.isCreating();

        // Assert
        actualResult.should.equal(expectedResult);
    });
});