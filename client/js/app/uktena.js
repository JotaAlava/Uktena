/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena', ['ui.router', 'uktenaHttp', 'angular-loading-bar'])
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                    url: '',
                    templateUrl: 'views/main.html'
                })
                .state('tomatoes', {
                    url: '/tomatoes',
                    templateUrl: 'views/tomatoes.html',
                    controller: 'tomatoesCtrl',
                    onEnter: function (tomatoesSvc, authSvc, feedbackSvc, $timeout) {
                        var onLoadSuccess = function (res) {
                            tomatoesSvc.set(res);
                            $timeout(function(){
                                $('.collapsible').collapsible({});
                            },500);
                        };

                        var onLoadFail = function () {
                            feedbackSvc.notify('Your session has expired!');
                            authSvc.logOut();
                        };

                        if (authSvc.isAuthenticated()) {
                            tomatoesSvc.load(onLoadSuccess, onLoadFail);
                        }
                    }
                });

            $urlRouterProvider.otherwise('');
        }]);
