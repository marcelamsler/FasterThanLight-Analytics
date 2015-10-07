angular.module('fasterThanLight').directive('chartFromWebsocket', function () {

    return {
        restrict: 'A',
        scope: {
            wsUrl: "@",
            minValue: "@",
            maxValue: "@"
        },
        link: function (scope, element, attrs) {
            var smoothie = new SmoothieChart({maxValue: scope.maxValue, minValue: scope.minValue});

            smoothie.streamTo(element[0], 0);

            var line1 = new TimeSeries();

            var ws = new WebSocket(scope.wsUrl);

            ws.onmessage = function(e){
                var message = JSON.parse(e.data);
                if (message.g != null) {
                    console.log(message.timeStamp, message.g[2]);
                    line1.append(message.timeStamp, message.g[2]);
                }
            };
            smoothie.addTimeSeries(line1, {lineWidth:2,strokeStyle:'#00ff00'});
        }
    };
});
