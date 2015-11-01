'use strict';

angular.module('fasterThanLight.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])


    .controller('MainCtrl', ['$scope', 'WebsocketService', function ($scope, WebSocketService) {

        $scope.currentSession = localStorage['actualSessionNumber'];

        this.onLapCompleted = function(data) {
          $scope.saveSession();
        };

        var onLapCompletedHandler = {
            type: "LapCompleted",
            callback: this.onLapCompleted
        };

        WebSocketService.addEventHandler(onLapCompletedHandler);

        $scope.saveSession = function () {
            WebSocketService.saveSession();
            $scope.currentSession++;
        }

    }
    ])
;