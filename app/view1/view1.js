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

        var myChart = $('#gaugeChart').epoch({
            type: 'time.gauge',
            value: 0.5
        });

        this.onNewCurrentPowerHandler = function (data) {
            myChart.push(100 / 256 * data.power / 100);
        };

        var onNewCurrentPowerHandler = {
            type: "SmoothedSensorData",
            callback: this.onNewCurrentPowerHandler
        };

        WebSocketService.addEventHandler(onNewCurrentPowerHandler);

        $scope.saveSession = function () {
            WebSocketService.saveSession();
            $scope.currentSession++;
        }

    }
    ])
;