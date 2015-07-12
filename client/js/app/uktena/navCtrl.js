/**
 * Created by Jose on 6/29/2015.
 */
angular.module('uktena')
    .controller('navCtrl', ['$scope', '$state', 'authSvc', 'tomatoesSvc', function ($scope, $state, authSvc, tomatoesSvc) {
        $scope.isAuthenticated = function () {
            return authSvc.isAuthenticated();
        };

        $scope.logOut = function () {
            authSvc.logOut();
            tomatoesSvc.clearTomatoes();
        };
    }]);