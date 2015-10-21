'use strict';

angular.module('fasterThanLight.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', function ($scope) {

        $scope.sessions = findValidSessions();
        console.log($scope.sessions);
        $scope.dataSessions = prepareSessionDataForCharts($scope.sessions);

        configureChart();


        $scope.clearHistory = function () {
            localStorage.clear();
            $scope.dataSessions = [];
            $scope.sessions = [];
        };

        function configureChart() {
            $scope.options = {
                lineMode: "linear",
                drawDots: false,
                tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return y;}},
                axes: {
                    x: {key: 'x', type: 'date', ticks: 10},
                    sensorData: {type: 'linear', ticks: 5, innerTicks: true, grid: true},
                    smoothedData: {type: 'linear'},
                    trackPartData: {type: 'line'}
                },
                series: [
                    {
                        y: "sensorData",
                        label: "Sensor",
                        color: "#3f5aff"
                    },
                    {
                        y: "smoothedData",
                        label: "Smoothed",
                        color: "#000000"
                    },
                    {
                        y: "trackPartData",
                        label: "trackPartData",
                        color: "#ff3333"
                    }
                ]
            };
        }

        function prepareSessionDataForCharts(sessions) {
            var dataSessions = [];
            for (var session in sessions) {
                if (sessions[session].sensorData != null) {
                    var actualSession = sessions[session];
                    var sessionData = actualSession.sensorData.map(function (dataPoint) {
                        var smoothedData = getSmoothedDataForDataPoint(dataPoint, actualSession);
                        var trackPartData = getTrackPartDataForDataPoint(dataPoint, actualSession);

                        return {
                            x: dataPoint.timeStamp,
                            sensorData: dataPoint.value,
                            smoothedData: smoothedData.value,
                            trackPartData: trackPartData.value
                        }
                    });

                    console.log("sessionData", sessionData);
                    dataSessions.push(sessionData);
                }
            }
            return dataSessions;


        }

        function isSimilarTime(firstTimeStamp, secondTimeStamp) {
            return Math.round(firstTimeStamp / 10) === Math.round(secondTimeStamp / 10);
        }

        function getSmoothedDataForDataPoint(dataPoint, session) {
            var smoothedData = session.smoothedSensorData.filter(function (sDataPoint) {
                return isSimilarTime(sDataPoint.timeStamp, dataPoint.timeStamp);
            })[0];
            if (smoothedData == null) {
                smoothedData = {
                    value: null
                }
            }
            return smoothedData;
        }

        function getTrackPartDataForDataPoint(dataPoint, session) {
            var trackPartData = session.trackPartData.filter(function (tDataPoint) {
                return isSimilarTime(tDataPoint.timeStamp, dataPoint.timeStamp);
            })[0];

            if (trackPartData == null) {
                trackPartData = {
                    value: null
                }
            }

            var value;
            switch (trackPartData.value) {
                case "LEFT":
                    value = -5000;
                    break;
                case "RIGHT":
                    value = 5000;
                    break;
                case "STRAIGHT":
                    value = 0;
                    break;
                default :
                    value = null;
            }

            return {
                value: value
            };
        }

        function findValidSessions() {
            var sessions = [];
            for (var property in localStorage) {
                if (localStorage.hasOwnProperty(property)) {
                    if (property.indexOf("session") > -1 && localStorage[property] != "undefined") {
                        sessions.push(JSON.parse(localStorage[property]));
                    }
                }
            }
            return sessions;
        }

    }]
);