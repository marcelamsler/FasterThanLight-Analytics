'use strict';

angular.module('fasterThanLight.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])


    .controller('MainCtrl', ['$scope', 'WebsocketService', function ($scope, WebSocketService) {


        var myChart = $('#gaugeChart').epoch({
            type: 'time.gauge',
            value: 0.5
        });

        var ws = new WebSocket("ws://localhost:8089/pilotData");

        ws.onmessage = function (e) {
            var parsedMessage = JSON.parse(e.data);
            var message = parsedMessage.genericMessage;
            var messageType = parsedMessage.eventMessageType;

            if (messageType === "SmoothedSensorData") {
                myChart.push(100 / 256 * message.currentPower / 100);
            }
        };

        $scope.startNewSession = function () {
            WebSocketService.startNewSession();
        }

    }
    ])
;