/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('tomatoesSvc', ['appConfig', 'httpSvc', 'authSvc', 'cookieSvc', function (appConfig, httpSvc, authSvc, cookieSvc) {
        var self = this,
            listOfTomatoes = [];

        self.create = function (newTomato) {
            var headers = {
                uktena: cookieSvc.get('uktena')
            };

            httpSvc.requestWithDataAsBody('POST', 'tomato', newTomato, headers)
                .success(function (res) {
                    listOfTomatoes.push(res[0]);
                });
        };

        self.load = function () {
            var token = authSvc.isAuthenticated();
            var headers = {
                uktena: token
            };

            return httpSvc.requestWithoutData('GET', 'tomato/' + token, headers)
                .success(function (res) {
                    listOfTomatoes = res;
                });
        };

        self.get = function () {
            return listOfTomatoes;
        };

        return self;
    }]);