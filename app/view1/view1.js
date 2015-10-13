'use strict';

angular.module('fasterThanLight.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])


    .controller('MainCtrl', ['$scope', function ($scope) {
        var trackPartArray = [];
        var tolerance = 200;

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


        $scope.$on("newTrackPart", function (event, data) {
            console.log(data);
            trackPartArray.push(data);
            if (trackPartArray.length > 100) {
                tryToFindPattern(trackPartArray);
            }
        });

        function tryToFindPattern(trackPartArray) {

            trackPartArray.forEach(function (element) {
                for (var i = 0; i < trackPartArray.length; i++) {
                    if (couldBeSameTrackPart(element, secondElement)) {

                    }
                }
            });
        }

        function couldBeSameTrackPart(trackPart1, trackPart2) {
            if (trackPart1.type != trackPart2.type) return false;

            var floorValue = trackPart1.duration - tolerance;
            var ceilingValue = trackPart1.duration + tolerance;

            return trackPart2.duration > floorValue && trackPart2.duration < ceilingValue;
        }


    }
    ])
;