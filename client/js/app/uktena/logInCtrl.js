/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('logInCtrl', ['$scope', '$state', 'authSvc', function ($scope, $state, authSvc) {
        $scope.logIn = function (username, password) {
            authSvc.logIn(username, password);
        };

        $scope.register = function (username, password) {
            authSvc.register(username, password);
        };
    }]);