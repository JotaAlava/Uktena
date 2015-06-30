/**
 * Created by Jose on 6/29/2015.
 */
angular.module('uktena')
    .controller('navCtrl', ['$scope', '$state', 'authSvc', 'jQuerySvc', function ($scope, $state, authSvc, jQuerySvc) {
        $scope.isAuthenticated = function () {
            return authSvc.isAuthenticated();
        }
    }]);