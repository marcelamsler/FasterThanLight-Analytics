angular.module('fasterThanLight').directive('chartFromWebsocket', function () {

    return {
        restrict: 'A',
        scope: {
            wsUrl: "@",
            minValue: "@",
            maxValue: "@",
        },
        link: function (scope, element, attrs) {
            var sensorDataChart = new SmoothieChart({maxValue: scope.maxValue, minValue: scope.minValue});
            sensorDataChart.streamTo(element[0].children[0], 0);

            var line1 = new TimeSeries();
            var line2 = new TimeSeries();

            var trackPartChart = new SmoothieChart({interpolation:'step', maxValue: 1.1, minValue: -1.1, grid:{strokeStyle:'#fdfdfd',sharpLines:true}});
            trackPartChart.streamTo(element[0].children[1], 0);

            var trackPartLine = new TimeSeries();
            var lastTrackPartTimeStamp = Date.now();


            var ws = new WebSocket(scope.wsUrl);

            ws.onmessage = function(e){
                var parsedMessage = JSON.parse(e.data);
                var message = parsedMessage.genericMessage;
                var messageType = parsedMessage.eventMessageType;

                if (messageType === "SensorEvent" && message.g != null) {
                    line1.append(message.timeStamp, message.g[2]);
                } else if (messageType == "SmoothedSensorData") {
                    line2.append(e.timeStamp, message.smoothValue);
                } else if(messageType == "TrackPartChanged") {
                    var value;
                    switch (message.newTrackType) {
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

                    trackPartLine.append(lastTrackPartTimeStamp, value);
                    lastTrackPartTimeStamp = e.timeStamp;
                }
            };

            sensorDataChart.addTimeSeries(line1, {lineWidth:2,strokeStyle:'#3f5aff'});
            sensorDataChart.addTimeSeries(line2, {lineWidth:2,strokeStyle:'#ffffff'});
            trackPartChart.addTimeSeries(trackPartLine, {lineWidth:2,strokeStyle:'#ff3333'});
        }
    };
});
