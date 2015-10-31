angular.module('fasterThanLight').directive('raceTrack', function () {

    return {
        restrict: 'A',
        scope: {},
        controller: "raceTrackCtrl",
        link: function (scope, element, attrs) {


        }
    }
});


angular.module('fasterThanLight').controller('raceTrackCtrl', ['$scope', 'WebsocketService', function ($scope, websocketService) {





}]);