/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktenaHttp')
    .factory('httpSvc', ['$http', function ($http) {
        var self = this,
            apiUrl = 'http://localhost:667/'; // TODO: Add this to application config

        self.requestWithoutData = function (verb, url) {
            var request = $http({
                method: verb,
                url: apiUrl + url
            });

            return request;
        };

        self.requestWithDataAsBody = function (verb, url, data) {
            var request = $http({
                method: verb,
                url: apiUrl + url,
                data: data
            });

            return request;
        };

        self.requestWithDataAsQueryString = function (verb, url, data) {
            var request = $http({
                method: verb,
                url: apiUrl + url,
                params: data
            });

            return request;
        };

        return self;
    }]);
