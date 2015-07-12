/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('authSvc', ['appConfig', 'httpSvc', '$q', 'cookieSvc', 'feedbackSvc', function (appConfig, httpSvc, q, cookieSvc, feedbackSvc) {
        var self = this;

        self.isAuthenticated = function () {
            return cookieSvc.get('uktena') || undefined;
        };

        // TODO: Elaborate more on this pattern for handling angular svcs and delayed actions!
        self.logIn = function (params, actionToExecutoAfterRequest) {
            var deferredResult = q.defer();

            httpSvc.requestWithDataAsBody('POST', 'login', params)
                .success(function (res) {
                    // Set the user id as cookie
                    cookieSvc.set(res.user._id);

                    deferredResult.resolve(res);

                    feedbackSvc.notify('Logged in!');
                    actionToExecutoAfterRequest();
                })
                .error(function (res) {
                    feedbackSvc.notify('Invalid credentials!');
                });

            return deferredResult;
        };

        self.register = function (params) {
            var deferredResult = q.defer();

            httpSvc.requestWithDataAsBody('POST', 'register', params)
                .success(function (res) {
                    delete res._id;

                    deferredResult.resolve(self.logIn(res));

                    feedbackSvc.notify('Welcome To Uktena');
                })
                .error(function (res) {
                    feedbackSvc.notify('Credentials in use or incomplete!');
                });

            return deferredResult;
        };

        self.logOut = function () {
            deleteAllCookies();
        };

        function deleteAllCookies() {
            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }

        return self;
    }]);