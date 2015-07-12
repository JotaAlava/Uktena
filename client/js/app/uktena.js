/**
 * Created by Jose on 5/2/2015.
 */
angular.module('uktena', ['ui.router', 'uktenaHttp'])
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
                    onEnter: function (tomatoesSvc, authSvc) {
                        if (authSvc.isAuthenticated()) {
                            tomatoesSvc.load();
                        }
                    }
                });

            $urlRouterProvider.otherwise('');
        }]);
