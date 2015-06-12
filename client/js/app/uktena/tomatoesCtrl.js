/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('tomatoesCtrl', ['$scope', 'tomatoesSvc', 'appConfig', '$timeout', function ($scope, tomatoesSvc, appConfig, $timeout) {
        var isCreating = false;
        $scope.listOfTomatoes = [];

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
            $scope.listOfTomatoes.push({
                date: new Date(),
                description: tomatoDescription
            });

            setIsCreatingToFalse();
        };

        var setIsCreatingToTrue = function () {
            isCreating = true;
        };

        var setIsCreatingToFalse = function () {
            isCreating = false;
        };
    }]);