/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktenaHttp')
    .factory('httpSvc', ['$http', function ($http) {
        var self = this,
            apiUrl = 'http://localhost:667/'; // TODO: Add this to application config

        self.requestWithoutData = function (verb, url, headers) {
            var options = {
                method: verb,
                url: apiUrl + url
            };

            if(headers !== undefined) {
                options.headers = headers
            }

            return $http(options);
        };

        self.requestWithDataAsBody = function (verb, url, data, headers) {
            var options = {
                method: verb,
                url: apiUrl + url,
                data: data
            };

            if(headers !== undefined) {
                options.headers = headers
            }

            return $http(options);
        };

        self.requestWithDataAsQueryString = function (verb, url, data, headers) {
            var options = {
                method: verb,
                url: apiUrl + url,
                params: data
            };

            if(headers !== undefined) {
                options.headers = headers
            }

            return $http(options);
        };

        return self;
    }]);
