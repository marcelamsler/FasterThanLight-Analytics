angular.module('fasterThanLight').service('WebsocketService', function(){

    var eventHandlers = [];
    var webSocket = new WebSocket("ws://localhost:8089/pilotData");
    var actualSessionData, actualSessionNumber;

    if (localStorage['actualSessionNumber'] != null) {
        actualSessionNumber = JSON.parse(localStorage['actualSessionNumber']);
    } else {
        actualSessionNumber = 0;
    }


    this.addEventHandler = function(eventHandler) {
        eventHandlers.push(eventHandler);
        return eventHandlers.length -1;
    };

    this.removeEventHandler = function (index) {
        eventHandlers.splice(index, 1);
    };

    this.saveSession = function () {
        localStorage["session" + actualSessionNumber] = JSON.stringify(angular.copy(actualSessionData));

        actualSessionNumber++;
        localStorage['actualSessionNumber'] = actualSessionNumber;

        actualSessionData = {
            sensorData: [],
            smoothedSensorData: [],
            trackPartData: []
        };

    };

    webSocket.onmessage = function(e){
        var parsedMessage = JSON.parse(e.data);
        var message = parsedMessage.genericMessage;
        var messageType = parsedMessage.eventMessageType;

        if (messageType === "SensorEvent" && message.g != null) {
            var data = {timeStamp: message.timeStamp, value: message.g[2]};
            actualSessionData.sensorData.push(data);

        } else if (messageType == "SmoothedSensorData") {
            var data = {timeStamp: e.timeStamp, value: message.smoothValue, currentPower: message.currentPower};
            actualSessionData.smoothedSensorData.push(data);

        } else if(messageType == "TrackPartChanged") {
            var data =  {timeStamp: e.timeStamp, value: message.newTrackType};
            actualSessionData.trackPartData.push(data);

        } else if(messageType == "trackInfo") {
            var data = message;
        }

        eventHandlers.forEach(function(handler) {
            if (messageType === handler.type) {
                handler.callback(data);
            }
        });



    };

    this.saveSession();

});