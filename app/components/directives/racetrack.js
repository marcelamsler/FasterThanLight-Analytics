angular.module('fasterThanLight').directive('raceTrack', function () {

    return {
        restrict: 'A',
        scope: {
            canvasWidth: '@',
            canvasHeight: '@'
        },
        replace: true,
        controller: "raceTrackCtrl",
        template: '<canvas width="{{canvasWidth}}" height="{{canvasHeight}}"></canvas>',
        link: function (scope, element, attrs) {
            scope.canvas = element[0];

        }
    }
});


angular.module('fasterThanLight').controller('raceTrackCtrl', ['$scope', 'WebsocketService', function ($scope, websocketService) {


    function init() {
        setBaseAnchorAndScaleFactor();
        drawOnCanvas ();
    }


    var drawOnCanvas = function () {

        var tracks = $scope.tracks;
        var canvas = $scope.canvas;

        var ctx = canvas.getContext("2d");
        clear(canvas);
        ctx.fillStyle = "#A0A0A0";
        ctx.strokeStyle = "#F00000";
        ctx.lineWidth = 3;
        $scope.width = 20;
        var scale = $scope.scaleFactor;

        var anchor = $scope.baseAnchor;

        // Draw the racetrack
        tracks.forEach(function (sector) {
            ctx.fillStyle = "#A0A0A0";
            if (angular.isUndefined(sector.radius)) {
                if (angular.isDefined(sector.speedLimit)) {
                    ctx.fillStyle = "#FF0000";
                }
                anchor = straight(ctx, anchor, scale * sector.length);
            } else {
                anchor = curve(ctx, anchor, scale * sector.radius, Math.abs(sector.angle), sector.orientation === "LEFT");
            }
        });

        drawFinalAndStart(ctx, $scope.baseAnchor);
    };

    var drawFinalAndStart = function (ctx, anchor) {
        var ofillStyle = ctx.fillStyle;
        var oStrokeStyle = ctx.strokeStyle;
        var width = 15;
        var height = 38;

        // Black underground for final
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.rect(anchor.x - (width / 2), anchor.y - (height / 2), width, height);
        ctx.fill();
        ctx.closePath();

        // White final marks
        var markSize = width / 2;
        ctx.fillStyle = "#FFFFFF";
        ctx.lineWidth = "1";

        ctx.beginPath();
        for (var i = 0; i < height / markSize; i++) {
            var leftSide = anchor.x - (width / 2);
            leftSide = (i % 2) ? leftSide + markSize : leftSide;

            var topPos = anchor.y - (height / 2);
            topPos += markSize * i;
            ctx.rect(leftSide, topPos, markSize, markSize);
            ctx.fill();
        }
        ctx.closePath();


        // Black border for final
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.rect(anchor.x - (width / 2), anchor.y - (height / 2), width, height);
        ctx.stroke();
        ctx.closePath();

        // Restore styles
        ctx.fillStyle = ofillStyle;
        ctx.strokeStyle = oStrokeStyle;
    };


    var clear = function (canvas) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    };

    /** *************************************************************************************************
     *
     * Draw a curve
     * @param ctx the canvas context
     * @param anchor the anchor = position and direction of the section to be created
     * @param radius the curvature radius of the curved section
     * @param angle the curvature angle of the curved section
     * @param ccw indicator for counter-clock-wise curvature.
     * @returns the anchor for the next section;
     */
    var curve = function (ctx, anchor, radius, angle, ccw) {

        //markAnchor(ctx, anchor);

        var sgn = ccw ? 1 : -1;

        // True driving angle
        var angleR0 = anchor.angle * Math.PI / 180.0;
        var center = {x: anchor.x - sgn * radius * Math.sin(angleR0), y: anchor.y - sgn * radius * Math.cos(angleR0)};

        // arc angels
        var ang0 = sgn * Math.PI / 2 - angleR0;
        var ang1 = ang0 - sgn * angle * Math.PI / 180.0;

        var width = $scope.width;
        var outer = radius + width / 2;
        var inner = radius - width / 2;
        ctx.beginPath();
        ctx.arc(center.x, center.y, outer, ang0, ang1, ccw);
        ctx.lineTo(center.x + inner * Math.cos(ang1), center.y + inner * Math.sin(ang1));
        ctx.arc(center.x, center.y, inner, ang1, ang0, !ccw);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();


        var newAnchor = {
            x: center.x + radius * Math.cos(ang1),
            y: center.y + radius * Math.sin(ang1),
            angle: anchor.angle + sgn * angle
        };

        return newAnchor;
    };

    /** *************************************************************************************************
     *
     * @param length the length of the straight section
     * @param ctx the canvas context
     * @param anchor the anchor = position and direction of the section to be created
     *
     * @returns the anchor for the next section
     */
    var straight = function (ctx, anchor, length) {

        var angleR = Math.PI * anchor.angle / 180;
        var sin = Math.sin(angleR);
        var cos = Math.cos(angleR);
        var width = $scope.width;

        var p1 = {x: anchor.x - sin * width / 2.0, y: anchor.y - cos * width / 2.0};
        var p2 = {x: p1.x + cos * length, y: p1.y - sin * length};
        var p3 = {x: p2.x + sin * width, y: p2.y + cos * width};
        var p4 = {x: p3.x - cos * length, y: p3.y + sin * length};

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.fill();
        ctx.closePath();

        var newAnchor = {
            x: anchor.x + length * Math.cos(angleR),
            y: anchor.y - length * Math.sin(angleR),
            angle: anchor.angle
        };

        return newAnchor;
    };

    var setBaseAnchorAndScaleFactor = function () {
        var padding = 10;
        $scope.scaleFactor = 1;
        var defaultAnchor = {
            x: 300,
            y: -300
        };

        $scope.baseAnchor = {
            angle: $scope.baseAnchor.angle,
            x: padding + defaultAnchor.x * $scope.scaleFactor,
            y: padding + defaultAnchor.y * $scope.scaleFactor
        };
    };

    init();

}]);