/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('tomatoesCtrl', ['$scope', 'tomatoesSvc', 'appConfig', '$timeout', function ($scope, tomatoesSvc, appConfig, $timeout) {
        var isCreating = false;
        $scope.listOfTomatoes = function () {
            return tomatoesSvc.get();
        };

        $scope.createEntry = function () {
            setIsCreatingToTrue();
        };

        $scope.isCreating = function () {
            return isCreating;
        };

        $scope.cancelEntry = function () {
            setIsCreatingToFalse();
        };

        $scope.submitEntry = function (tomatoDescription) {
            var newTomato = {
                dateCreated: new Date(),
                description: tomatoDescription
            };

            tomatoesSvc.create(newTomato);
            setIsCreatingToFalse();
        };

        var setIsCreatingToTrue = function () {
            isCreating = true;
        };

        var setIsCreatingToFalse = function () {
            isCreating = false;
        };
    }]);