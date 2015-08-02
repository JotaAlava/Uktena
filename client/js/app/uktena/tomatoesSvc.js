/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena')
    .factory('tomatoesSvc', ['appConfig', 'httpSvc', 'authSvc', 'cookieSvc', 'feedbackSvc', '$timeout', function (appConfig, httpSvc, authSvc, cookieSvc, feedbackSvc, $timeout) {
        var self = this,
            listOfTomatoes = {};

        // TODO: Refacotr to follow pattern of optional, but injectable, success and error handlers
        self.create = function (newTomato) {
            var headers = {
                uktena: cookieSvc.get('uktena')
            };

            httpSvc.requestWithDataAsBody('POST', 'tomato', newTomato, headers)
                .success(function (res) {
                    var dateOfCreation = new Date(res[0].dateCreated).toLocaleDateString();

                    if(listOfTomatoes.hasOwnProperty(dateOfCreation)){
                        listOfTomatoes[dateOfCreation].push(res[0]);
                        $('.collapsible').collapsible({});
                    } else{
                        self.load(function (res) {
                            self.set(res);
                            $timeout(function(){
                                $('.collapsible').collapsible({});
                            },500);
                        }, function () {
                            feedbackSvc.notify('Your session has expired!');
                            authSvc.logOut();
                        });
                    }
                })
                .error(function (res) {
                    if (res === 'Unauthorized'){
                        feedbackSvc.notify('Your session has expired!');
                        authSvc.logOut();
                    }
                });
        };

        self.load = function (success, failure) {
            var token = authSvc.isAuthenticated();
            var headers = {
                uktena: token
            };

            return httpSvc.requestWithDataAsQueryString('GET', 'tomato', {author: token},headers)
                .success(function (res) {
                    success(res);
                })
                .error(function (res) {
                    if (res === 'Unauthorized'){
                        failure(res);
                    }
                });
        };

        self.get = function () {
            return listOfTomatoes;
        };

        self.set = function (newList) {
            listOfTomatoes = {};
            // TODO: Refactor this madness, test it!
            var groupedItems = _.groupBy(newList, function(item, val) {
                return new Date(item.dateCreated).toLocaleDateString();
            });

            var result = [];
            _.each(groupedItems, function(val, key, item){
                var obj = {};
                obj[key] = val;
                result.push(obj);
            });

            _.each(result.reverse(), function (val, key, list) {
                var nameOfProperty = Object.keys(val)[0]; // Should always be only one
                listOfTomatoes[nameOfProperty] = val[nameOfProperty];
            });
        };

        self.clearTomatoes = function () {
            listOfTomatoes = {};
        };

        self.delete = function (id) {
            var token = authSvc.isAuthenticated();
            var onSuccess = function (res) {
                if (res.length === 0) {
                    self.clearTomatoes();
                } else {
                    self.set(res);
                }
            };
            var onError = function () {
                feedbackSvc.notify('Your session has expired!');
                authSvc.logOut();
            };
            var headers = {
                uktena: token
            };

            httpSvc.requestWithoutData('DELETE', 'tomato/' +  id, headers)
                .success(function (res) {
                    self.load(onSuccess, onError);
                    feedbackSvc.notify('Entry deleted.');
                })
                .error(function (res) {
                    if (res === 'Unauthorized'){
                        feedbackSvc.notify('Your session has expired!');
                        authSvc.logOut();
                    }
                });
        };

        return self;
    }]);