angular.module('fasterThanLight').directive('chartFromWebsocket', function () {

    return {
        restrict: 'A',
        scope: {
            wsUrl: "@",
            minValue: "@",
            maxValue: "@",
            messageType: "@"
        },
        link: function (scope, element, attrs) {
            var smoothie = new SmoothieChart({maxValue: scope.maxValue, minValue: scope.minValue});

            smoothie.streamTo(element[0], 0);

            var line1 = new TimeSeries();
            var line2 = new TimeSeries();

            var ws = new WebSocket(scope.wsUrl);

            ws.onmessage = function(e){
                var parsedMessage = JSON.parse(e.data);
                var message = parsedMessage.genericMessage;
                var messageType = parsedMessage.eventMessageType;

                if (messageType === scope.messageType && message.g != null) {
                    line1.append(message.timeStamp, message.g[2]);
                } else {
                    line2.append(e.timeStamp, message.smoothValue);
                }
            };
            smoothie.addTimeSeries(line1, {lineWidth:2,strokeStyle:'#00ff00'});
            smoothie.addTimeSeries(line2, {lineWidth:2,strokeStyle:'#ffffff'});
        }
    };
});
