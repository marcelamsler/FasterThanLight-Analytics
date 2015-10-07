'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.stomp'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$scope', '$stomp', function ($scope, $stomp) {


        $stomp.setDebug(function (args) {
            document.getElementById('log').value += args + '\n';
        });

        var REST_API_URL = "";

        $stomp.connect(REST_API_URL + '/messages', connectHeaders)

            // frame = CONNECTED headers
            .then(function (frame) {

                var subscription = $stomp.subscribe('/topic/simulator/news', function (payload, headers, res) {
                    $scope.payload = payload;
                }, {
                    "headers": "are awesome"
                });

                subscription.unsubscribe();

                // Send message
                $stomp.send('/dest', {
                    message: 'body'
                }, {
                    priority: 9,
                    custom: 42 //Custom Headers
                });

                // Disconnect
                $stomp.disconnect(function () {

                });
            });


        var message_handler = function (message) {
            return $scope.$apply(function () {
                return $scope.onReceiveMessage(message);
            });
        };



        $scope.onReceiveMessage = function (message) {
            console.log(message);
        }

    }]);