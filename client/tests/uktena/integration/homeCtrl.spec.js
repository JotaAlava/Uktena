/**
 * Created by Jose on 6/6/2015.
 */
describe('homeCtrl', function(){
    var scope, ctrl;
    beforeEach(module('uktena'));

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ctrl = $controller('homeCtrl', { $scope: scope });
    }));

    it('tomatoLength property is by default \'25\'', function() {
        scope.tomatoLength.should.equal(25)
    });
});