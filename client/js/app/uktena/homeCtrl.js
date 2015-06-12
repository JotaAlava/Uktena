/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('homeCtrl', ['$scope', 'timerSvc', 'appConfig', '$state', function ($scope, timerSvc, appConfig, $state) {
        $scope.tomatoLength = 25;

        $scope.startTimer = function () {
            timerSvc.setTimerLength(toMilliseconds($scope.tomatoLength));
            timerSvc.startTimer();
        };

        $scope.stopTimer = function () {
            timerSvc.stopTimer();
        };

        $scope.timeLeft = function () {
            var timeLeft = timerSvc.getPrettyTimeLeft();
            if (timeLeft === '0:00' && timerSvc.isRunning())
            {
                timerSvc.stopTimer();
                alert('Your tomato has ended! Log the work completed.');
                // TODO: Figure out how to play a sound!
                $state.go('tomatoes'); // TODO: Make constant
            }

            return timeLeft;
        };

        $scope.shortBreak = function () {
            timerSvc.setTimerLength(appConfig._SHORT_BREAK);
            timerSvc.startTimer();
        };

        $scope.longBreak = function () {
            timerSvc.setTimerLength(appConfig._LONG_BREAK);
            timerSvc.startTimer();
        };

        var toMilliseconds = function (newTime) {
            return newTime * 60000;
        };
    }]);