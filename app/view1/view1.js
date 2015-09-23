'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', function ($scope) {

        var message_handler = function (message) {
            return $scope.$apply(function () {
                return $scope.onReceiveMessage(message);
            });
        };
        new AmqpConnection(message_handler, 'confirm-test');

        $scope.onReceiveMessage = function (message) {
            console.log(message);
        }

    }]);