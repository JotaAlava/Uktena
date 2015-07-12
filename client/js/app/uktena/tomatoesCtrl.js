/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('tomatoesCtrl', ['$scope', 'tomatoesSvc', 'authSvc', '$timeout', function ($scope, tomatoesSvc, authSvc, $timeout) {
        var isCreating = false;
        $scope.listOfTomatoes = function () {
            return tomatoesSvc.get();
        };

        $scope.createEntry = function () {
            setIsCreatingToTrue();
        };

        $scope.isCreating = function () {
            return isCreating;
        };

        $scope.cancelEntry = function () {
            setIsCreatingToFalse();
        };

        $scope.submitEntry = function (tomatoDescription) {
            if (!tomatoDescription) return;

            var newTomato = {
                author: authSvc.isAuthenticated(),
                dateCreated: new Date(),
                description: tomatoDescription
            };

            tomatoesSvc.create(newTomato);
            setIsCreatingToFalse();
        };


        $scope.setCardStyle = function (cardToStyle) {
            $scope.cards[cardToStyle] = expandedCard;
        };

        $scope.clearCardStyle = function (cardToStyle) {
            $scope.cards[cardToStyle] = {};
        };

        $scope.cards = {
            logIn: {},
            register: {}
        };

        $scope.logIn = function (username, password) {
            var params = {
                username: username,
                password: password
            };

            authSvc.logIn(params, function () {
                tomatoesSvc.load();
            });
        };

        $scope.register = function (username, password) {
            var params = {
                username: username,
                password: password
            };

            authSvc.register(params);
        };

        $scope.isAuthenticated = function () {
            return authSvc.isAuthenticated();
        };

        var expandedCard = {'height': '210px'};

        var setIsCreatingToTrue = function () {
            isCreating = true;
        };

        var setIsCreatingToFalse = function () {
            isCreating = false;
        };
    }]);