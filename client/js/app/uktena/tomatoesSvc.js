/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('tomatoesSvc', ['appConfig', 'httpSvc', function (appConfig, httpSvc) {
        var self = this,
            listOfTomatoes = [];

        self.create = function (newTomato) {
            httpSvc.requestWithDataAsBody('POST', 'tomato', newTomato)
                .success(function (res) {
                    listOfTomatoes.push(res[0]);
                });
        };

        self.load = function () {
            return httpSvc.requestWithoutData('GET', 'tomato')
                .success(function (res) {
                    listOfTomatoes = res;
                });
        };

        self.get = function () {
            return listOfTomatoes;
        };

        return self;
    }]);