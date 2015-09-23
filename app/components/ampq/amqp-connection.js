(function() {
    var AmqpConnection, amqp, gui, uuid,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    amqp = require("amqp");
    uuid = require("uuid");
    gui = require("nw.gui");

    AmqpConnection = (function() {
        function AmqpConnection(handler, queueName) {
            var _this = this;
            this.handler = handler;
            this.receive = __bind(this.receive, this);
            this.connection = amqp.createConnection({
                host: "localhost",
                login: "guest",
                password: "guest"
            });
            this.connection.on("ready", function() {
                _this.queue_name = queueName;
                gui.Window.get().on("close", function() {
                    return _this.connection.end();
                });
                return _this.connection.queue(_this.queue_name, function(q) {
                    _this.q = q;
                    _this.q.bind("#");
                    return _this.q.subscribe(_this.receive);
                });
            });
        }

        AmqpConnection.prototype.receive = function(msg, headers, deliveryInfo) {
            var message;
            headers.received = new Date().getTime();
            message = {
                headers: headers,
                body: msg
            };
            return this.handler(message);
        };

        return AmqpConnection;

    })();

    window.AmqpConnection = AmqpConnection;

}).call(this);