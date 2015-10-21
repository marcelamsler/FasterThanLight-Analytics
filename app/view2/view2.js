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

        function configureChart() {
            $scope.options = {
                lineMode: "linear",
                series: [
                    {
                        y: "sensorData",
                        label: "Sensor",
                        color: "#e377c2"
                    }
                ]
            };
        }

        function prepareSessionDataForCharts(sessions) {
            var dataSessions = [];
            for (var session in sessions) {
                if (sessions[session].sensorData != null) {
                    var sessionData = sessions[session].sensorData.map(function (dataPoint) {
                        return {
                            x: dataPoint.timeStamp,
                            sensorData: dataPoint.value,
                            smoothedData: null,
                            trackPartData: null
                        }
                    });
                    dataSessions.push(sessionData);
                }
            }
            return dataSessions;
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