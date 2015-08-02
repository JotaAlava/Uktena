/**
 * Created by Jose on 6/4/2015.
 */
angular.module('uktena')
    .controller('tomatoesCtrl', ['$scope', 'tomatoesSvc', 'authSvc', '$timeout', 'feedbackSvc', function ($scope, tomatoesSvc, authSvc, $timeout, feedbackSvc) {
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
                tomatoesSvc.load(onLoadSuccess, onLoadFail);
            });
        };

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

        $scope.register = function (username, password, secret) {
            var params = {
                username: username,
                password: password,
                passwordSecret: secret
            };

            authSvc.register(params);
        };

        $scope.isAuthenticated = function () {
            return authSvc.isAuthenticated();
        };

        var deleteDictionary = {};

        $scope.deleteEntry = function (tomato) {
            if(deleteDictionary[tomato._id] === undefined) {
                deleteDictionary[tomato._id] = true;
            } else {
                deleteDictionary[tomato._id] = !deleteDictionary[tomato];
            }
        };

        $scope.cancelDeleteEntry = function (tomato) {
            deleteDictionary[tomato._id] = false;
        };

        $scope.confirmDeleteEntry = function (tomato) {
            tomatoesSvc.delete(tomato._id);
            $timeout(function () {
                setIsCreatingToFalse();
            }, 100);
        };

        $scope.isDeleting = function (tomato) {
            return deleteDictionary[tomato._id];
        };

        $scope.lengthOfObj = function (obj) {
            return _.size(obj);
        };

        var expandedCard = {'height': '210px'};

        var setIsCreatingToTrue = function () {
            isCreating = true;
        };

        var setIsCreatingToFalse = function () {
            isCreating = false;
        };
    }]);