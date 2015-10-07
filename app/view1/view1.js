'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', '$websocket', function ($scope, $websocket) {

        var smoothie = new SmoothieChart({maxValue:5000,minValue:-5000});
        smoothie.streamTo(document.getElementById("mycanvas"));


        var line1 = new TimeSeries();

        var ws = new WebSocket("ws://localhost:8089/pilotData");

        ws.onmessage = function(e){
            var message = JSON.parse(e.data);
            if (message.g != null) {
                console.log(message.timeStamp, message.g[2]);
                line1.append(message.timeStamp, message.g[2]);
            }
        };
        smoothie.addTimeSeries(line1 , { strokeStyle:'rgb(0, 255, 0)', lineWidth:3 });

    }]);