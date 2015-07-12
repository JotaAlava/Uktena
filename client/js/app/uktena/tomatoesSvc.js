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
                })
                .error(function (res) {
                    if (res === 'Unauthorized'){
                        feedbackSvc.notify('Your session has expired!');
                        authSvc.logOut();
                    }
                });
        };

        self.load = function () {
            var token = authSvc.isAuthenticated();
            var headers = {
                uktena: token
            };

            return httpSvc.requestWithDataAsQueryString('GET', 'tomato', {author: token},headers)
                .success(function (res) {
                    listOfTomatoes = res;
                })
                .error(function (res) {
                    if (res === 'Unauthorized'){
                        feedbackSvc.notify('Your session has expired!');
                        authSvc.logOut();
                    }
                });
        };

        self.get = function () {
            return listOfTomatoes;
        };

        self.clearTomatoes = function () {
            listOfTomatoes = [];
        };

        return self;
    }]);