/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('feedbackSvc', [function () {
        var self = this;

        self.notify = function (message) {
            Materialize.toast(message, 500)
        };

        return self;
    }]);