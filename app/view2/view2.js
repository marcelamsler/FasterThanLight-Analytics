'use strict';

angular.module('fasterThanLight.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', ['$scope', function ($scope) {

        var historySessions = [];

        for (var property in localStorage) {
            if (localStorage.hasOwnProperty(property)) {

                if (property.indexOf("session") > -1 && localStorage[property] != "undefined") {
                    historySessions[property] = JSON.parse(localStorage[property]);
                }
            }
        }

        var dataSessions = [];

        for (var session in historySessions) {
            if (historySessions[session].sensorData != null) {

                var sessionData = historySessions[session].sensorData.map(function (dataPoint) {
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

        console.log(dataSessions);

        $scope.data = dataSessions[2];


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
    }]
);