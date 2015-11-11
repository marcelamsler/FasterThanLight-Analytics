angular.module('fasterThanLight').directive('chartDirective', function () {

    return {
        restrict: 'A',
        scope: {
            minValue: "@",
            maxValue: "@"
        },
        controller: "ChartCtrl",
        link: function (scope, element, attrs) {

            var minValue = -6000;
            var maxValue = 6000;

            scope.sensorDataChart = new SmoothieChart({maxValue: maxValue, minValue: minValue});
            scope.sensorDataChart.streamTo(element[0].children[0], 0);

            scope.trackPartChart = new SmoothieChart({
                interpolation: 'step',
                maxValue: 1.1,
                minValue: -1.1,
                grid: {strokeStyle: '#fdfdfd', sharpLines: true}
            });
            scope.trackPartChart.streamTo(element[0].children[1], 0);

            scope.line1 = new TimeSeries();
            scope.line2 = new TimeSeries();
            scope.line3 = new TimeSeries();
            scope.trackPartLine = new TimeSeries();

            scope.sensorDataChart.addTimeSeries(scope.line1, {lineWidth: 2, strokeStyle: '#3f5aff'});
            scope.sensorDataChart.addTimeSeries(scope.line2, {lineWidth: 2, strokeStyle: '#ffffff'});
            scope.sensorDataChart.addTimeSeries(scope.line3, {lineWidth: 2, strokeStyle: '#ff3333'});
            scope.trackPartChart.addTimeSeries(scope.trackPartLine, {lineWidth: 2, strokeStyle: '#ff3333'});

        }
    }
});

angular.module('fasterThanLight').controller('ChartCtrl', ['$scope', 'WebsocketService', function ($scope, websocketService) {

    var lastTrackPartTimeStamp = Date.now();

    this.onNewSensorData = function (data) {
        $scope.line1.append(data.timeStamp, data.value);
    };

    this.onNewSmoothedSensorData = function (data) {
        $scope.line2.append(data.timeStamp, data.value);
        $scope.line3.append(data.timeStamp, data.currentPower * 10);
        console.log(data.currentPower);
    };

    this.onNewTrackPart = function (data) {
        var value;
        switch (data.value) {
            case "LEFT":
                value = -1;
                break;
            case "RIGHT":
                value = 1;
                break;
            case "STRAIGHT":
                value = 0;
                break;
        }

        $scope.trackPartLine.append(lastTrackPartTimeStamp, value);
        lastTrackPartTimeStamp = data.timeStamp;
    };

    var onNewSensorDataHandler = {
        type: "SensorEvent",
        callback: this.onNewSensorData
    };

    var onNewSmoothedSensorDataHandler = {
        type: "SmoothedSensorData",
        callback: this.onNewSmoothedSensorData
    };

    var onNewTrackPartDataHandler = {
        type: "TrackPartChanged",
        callback: this.onNewTrackPart
    };


    websocketService.addEventHandler(onNewSensorDataHandler);
    websocketService.addEventHandler(onNewSmoothedSensorDataHandler);
    websocketService.addEventHandler(onNewTrackPartDataHandler);


}]);
