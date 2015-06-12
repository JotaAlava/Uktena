/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('timerSvc', ['$interval', 'appConfig', function ($timeout, appConfig) {
        var self = this,
            timerLength = appConfig._25_MINUTES,
            timeoutPromise = null,
            isRunning = false;

        self.setTimerLength = function (newTime) {
            timerLength = newTime;
        };

        self.getTimerLength = function () {
            return timerLength;
        };

        self.getTimeoutPromise = function () {
            return timeoutPromise;
        };

        self.startTimer = function () {
            self.stopTimer();

            timeoutPromise = $timeout(function () {
                timerLength = timerLength - 1000;
            }, 1000);

            enableIsRunningFlag();
        };

        self.stopTimer = function () {
            $timeout.cancel(timeoutPromise);
            disableIsRunningFlag();
        };

        self.getPrettyTimeLeft = function () {
            return formatForTimeForDisplay(timerLength);
        };

        self.isRunning = function () {
            return isRunning;
        };

        var formatForTimeForDisplay = function (milliseconds) {
            milliseconds = milliseconds / 1000;

            var numminutes = Math.floor((((milliseconds % 31536000) % 86400) % 3600) / 60);
            var numseconds = (((milliseconds % 31536000) % 86400) % 3600) % 60;

            if (numseconds === 0) numseconds = '00';

            return numminutes + ":" + numseconds;
        };

        var enableIsRunningFlag = function () {
            isRunning = true;
        };

        var disableIsRunningFlag = function () {
            isRunning = false;
        };

        return self;
    }]);