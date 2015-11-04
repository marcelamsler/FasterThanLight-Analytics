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
                    x: {key: 'x', type: 'date', ticks: 10,zoomable:true},
                    sensorData: {type: 'linear'},
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
                        type: "column",
                        color: 'rgba(251, 110, 78, 0.13)'
                    },
                    {
                        y: "power",
                        label: "power",
                        color: '#129C2A'
                    }
                ]
            };
        }

        function prepareSessionDataForCharts(sessions) {
            var dataSessions = [];
            for (var session in sessions) {
                $scope.actualTrackPartData = {
                    value: "STRAIGHT"
                };
                $scope.actualTrackPartIndex = 0;
                $scope.lastCurrentPowerValue = 0;
                if (sessions[session].sensorData != null) {
                    var actualSession = sessions[session];
                    var sessionData = actualSession.sensorData.map(function (dataPoint) {
                        var smoothedData = getSmoothedDataForDataPoint(dataPoint, actualSession);
                        var trackPartData = getTrackPartDataForDataPoint(dataPoint, actualSession);
                        var power = smoothedData.currentPower;
                        if (power == null) {
                            power = 0;
                        }

                        return {
                            x: dataPoint.timeStamp,
                            sensorData: dataPoint.value,
                            smoothedData: smoothedData.value,
                            trackPartData: trackPartData.value,
                            power: power
                        }
                    });
                    console.log("sessionData prepared for chart", sessionData);
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
                    value: null,
                    currentPower: $scope.lastCurrentPowerValue

                }
            } else {
                smoothedData.currentPower *= 20;
                $scope.lastCurrentPowerValue = smoothedData.currentPower;
            }
            return smoothedData;
        }

        function getTrackPartDataForDataPoint(dataPoint, session) {
            var newTrackPartData;
            var trackPartData;

            for (var i = $scope.actualTrackPartIndex; i < session.trackPartData.length; i++) {
                if (session.trackPartData[i].timeStamp < dataPoint.timeStamp) {
                    newTrackPartData = session.trackPartData[i + 1];
                    $scope.actualTrackPartIndex++;
                }
            }

            if (newTrackPartData == null) {
                trackPartData = $scope.actualTrackPartData
            } else {
                trackPartData = newTrackPartData;
                $scope.actualTrackPartData = newTrackPartData;

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
                    if (property.indexOf("session") > -1 && localStorage[property] != "undefined" && localStorage[property].length > 300) {
                        sessions.push(JSON.parse(localStorage[property]));
                    }
                }
            }
            return sessions;
        }

    }]
);