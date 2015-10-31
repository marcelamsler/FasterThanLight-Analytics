angular.module('fasterThanLight').directive('raceTrack', function () {

    return {
        restrict: 'A',
        scope: {},
        controller: "raceTrackCtrl",
        link: function (scope, element, attrs) {
            scope.canvas = element[0];
            scope.init();
        }
    }
});


angular.module('fasterThanLight').controller('raceTrackCtrl', ['$scope', 'WebsocketService', function ($scope, websocketService) {

    $scope.tracks = JSON.parse('{"trackId":"embedded","sections":[{"length":180,"initialAnchor":{"angle360":0,"posX":0,"posY":0},"lengthUntilEnd":180,"finalAnchor":{"angle360":0,"posX":180,"posY":0}},{"length":40,"initialAnchor":{"angle360":0,"posX":180,"posY":0},"lengthUntilEnd":220,"finalAnchor":{"angle360":0,"posX":220,"posY":0},"id":"BA01","speedLimit":300,"roundStart":true},{"length":23.561944901923447,"initialAnchor":{"angle360":0,"posX":220,"posY":0},"lengthUntilEnd":243.56194490192345,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-45,"posX":241.21320343559643,"posY":8.786796564403577}},{"length":23.561944901923447,"initialAnchor":{"angle360":-45,"posX":241.21320343559643,"posY":8.786796564403577},"lengthUntilEnd":267.1238898038469,"radius":30,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":0,"posX":262.42640687119285,"posY":17.57359312880715}},{"length":39.269908169872416,"initialAnchor":{"angle360":0,"posX":262.42640687119285,"posY":17.57359312880715},"lengthUntilEnd":306.3937979737193,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-45,"posX":297.78174593052023,"posY":32.21825406947978}},{"length":39.269908169872416,"initialAnchor":{"angle360":-45,"posX":297.78174593052023,"posY":32.21825406947978},"lengthUntilEnd":345.6637061435917,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-90,"posX":312.42640687119285,"posY":67.57359312880715}},{"length":39.269908169872416,"initialAnchor":{"angle360":-90,"posX":312.42640687119285,"posY":67.57359312880715},"lengthUntilEnd":384.9336143134641,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-135,"posX":297.78174593052023,"posY":102.92893218813452}},{"length":39.269908169872416,"initialAnchor":{"angle360":-135,"posX":297.78174593052023,"posY":102.92893218813452},"lengthUntilEnd":424.2035224833365,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-180,"posX":262.42640687119285,"posY":117.57359312880715}},{"length":39.269908169872416,"initialAnchor":{"angle360":-180,"posX":262.42640687119285,"posY":117.57359312880715},"lengthUntilEnd":463.4734306532089,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-135,"posX":227.07106781186548,"posY":132.21825406947977}},{"length":39.269908169872416,"initialAnchor":{"angle360":-135,"posX":227.07106781186548,"posY":132.21825406947977},"lengthUntilEnd":502.7433388230813,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-90,"posX":212.42640687119285,"posY":167.57359312880715}},{"length":60,"initialAnchor":{"angle360":-90,"posX":212.42640687119285,"posY":167.57359312880715},"lengthUntilEnd":562.7433388230813,"finalAnchor":{"angle360":-90,"posX":212.42640687119285,"posY":227.57359312880715}},{"length":23.561944901923447,"initialAnchor":{"angle360":-90,"posX":212.42640687119285,"posY":227.57359312880715},"lengthUntilEnd":586.3052837250048,"radius":30,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-45,"posX":221.21320343559643,"posY":248.78679656440357}},{"length":23.561944901923447,"initialAnchor":{"angle360":-45,"posX":221.21320343559643,"posY":248.78679656440357},"lengthUntilEnd":609.8672286269282,"radius":30,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":0,"posX":242.42640687119285,"posY":257.57359312880715}},{"length":23.561944901923447,"initialAnchor":{"angle360":0,"posX":242.42640687119285,"posY":257.57359312880715},"lengthUntilEnd":633.4291735288516,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-45,"posX":263.6396103067893,"posY":266.3603896932107}},{"length":23.561944901923447,"initialAnchor":{"angle360":-45,"posX":263.6396103067893,"posY":266.3603896932107},"lengthUntilEnd":656.991118430775,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-90,"posX":272.42640687119285,"posY":287.57359312880715}},{"length":23.561944901923447,"initialAnchor":{"angle360":-90,"posX":272.42640687119285,"posY":287.57359312880715},"lengthUntilEnd":680.5530633326985,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-135,"posX":263.6396103067893,"posY":308.7867965644036}},{"length":23.561944901923447,"initialAnchor":{"angle360":-135,"posX":263.6396103067893,"posY":308.7867965644036},"lengthUntilEnd":704.1150082346219,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-180,"posX":242.42640687119285,"posY":317.57359312880715}},{"length":340,"initialAnchor":{"angle360":-180,"posX":242.42640687119285,"posY":317.57359312880715},"lengthUntilEnd":1044.1150082346219,"finalAnchor":{"angle360":-180,"posX":-97.57359312880715,"posY":317.5735931288072}},{"length":40,"initialAnchor":{"angle360":-180,"posX":-97.57359312880715,"posY":317.5735931288072},"lengthUntilEnd":1084.1150082346219,"finalAnchor":{"angle360":-180,"posX":-137.57359312880715,"posY":317.5735931288072},"id":"BA02","speedLimit":300,"roundStart":false},{"length":23.561944901923447,"initialAnchor":{"angle360":-180,"posX":-137.57359312880715,"posY":317.5735931288072},"lengthUntilEnd":1107.6769531365453,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-225,"posX":-158.78679656440357,"posY":308.78679656440363}},{"length":23.561944901923447,"initialAnchor":{"angle360":-225,"posX":-158.78679656440357,"posY":308.78679656440363},"lengthUntilEnd":1131.2388980384687,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-270,"posX":-167.57359312880715,"posY":287.5735931288072}},{"length":23.561944901923447,"initialAnchor":{"angle360":-270,"posX":-167.57359312880715,"posY":287.5735931288072},"lengthUntilEnd":1154.8008429403922,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-315,"posX":-158.78679656440357,"posY":266.3603896932108}},{"length":23.561944901923447,"initialAnchor":{"angle360":-315,"posX":-158.78679656440357,"posY":266.3603896932108},"lengthUntilEnd":1178.3627878423156,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-360,"posX":-137.57359312880715,"posY":257.5735931288072}},{"length":40,"initialAnchor":{"angle360":-360,"posX":-137.57359312880715,"posY":257.5735931288072},"lengthUntilEnd":1218.3627878423156,"finalAnchor":{"angle360":-360,"posX":-97.57359312880715,"posY":257.5735931288072},"id":"BA03","speedLimit":300,"roundStart":false},{"length":160,"initialAnchor":{"angle360":-360,"posX":-97.57359312880715,"posY":257.5735931288072},"lengthUntilEnd":1378.3627878423156,"finalAnchor":{"angle360":-360,"posX":62.42640687119285,"posY":257.57359312880715}},{"length":40,"initialAnchor":{"angle360":-360,"posX":62.42640687119285,"posY":257.57359312880715},"lengthUntilEnd":1418.3627878423156,"finalAnchor":{"angle360":-360,"posX":102.42640687119285,"posY":257.57359312880715},"id":"BA04","speedLimit":300,"roundStart":false},{"length":39.269908169872416,"initialAnchor":{"angle360":-360,"posX":102.42640687119285,"posY":257.57359312880715},"lengthUntilEnd":1457.632696012188,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-315,"posX":137.78174593052023,"posY":242.92893218813452}},{"length":39.269908169872416,"initialAnchor":{"angle360":-315,"posX":137.78174593052023,"posY":242.92893218813452},"lengthUntilEnd":1496.9026041820605,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-270,"posX":152.42640687119285,"posY":207.57359312880715}},{"length":60,"initialAnchor":{"angle360":-270,"posX":152.42640687119285,"posY":207.57359312880715},"lengthUntilEnd":1556.9026041820605,"finalAnchor":{"angle360":-270,"posX":152.42640687119285,"posY":147.57359312880715}},{"length":39.269908169872416,"initialAnchor":{"angle360":-270,"posX":152.42640687119285,"posY":147.57359312880715},"lengthUntilEnd":1596.172512351933,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-225,"posX":137.78174593052023,"posY":112.21825406947977}},{"length":39.269908169872416,"initialAnchor":{"angle360":-225,"posX":137.78174593052023,"posY":112.21825406947977},"lengthUntilEnd":1635.4424205218054,"radius":50,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-180,"posX":102.42640687119284,"posY":97.57359312880715}},{"length":40,"initialAnchor":{"angle360":-180,"posX":102.42640687119284,"posY":97.57359312880715},"lengthUntilEnd":1675.4424205218054,"finalAnchor":{"angle360":-180,"posX":62.42640687119284,"posY":97.57359312880715},"id":"BA05","speedLimit":300,"roundStart":false},{"length":100,"initialAnchor":{"angle360":-180,"posX":62.42640687119284,"posY":97.57359312880715},"lengthUntilEnd":1775.4424205218054,"finalAnchor":{"angle360":-180,"posX":-37.57359312880716,"posY":97.57359312880716}},{"length":40,"initialAnchor":{"angle360":-180,"posX":-37.57359312880716,"posY":97.57359312880716},"lengthUntilEnd":1815.4424205218054,"finalAnchor":{"angle360":-180,"posX":-77.57359312880716,"posY":97.57359312880716},"id":"BA06","speedLimit":300,"roundStart":false},{"length":23.561944901923447,"initialAnchor":{"angle360":-180,"posX":-77.57359312880716,"posY":97.57359312880716},"lengthUntilEnd":1839.0043654237288,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-225,"posX":-98.78679656440359,"posY":88.78679656440359}},{"length":23.561944901923447,"initialAnchor":{"angle360":-225,"posX":-98.78679656440359,"posY":88.78679656440359},"lengthUntilEnd":1862.5663103256522,"radius":30,"orientation":"LEFT","angle":45,"finalAnchor":{"angle360":-180,"posX":-120.00000000000001,"posY":80.00000000000001}},{"length":40,"initialAnchor":{"angle360":-180,"posX":-120.00000000000001,"posY":80.00000000000001},"lengthUntilEnd":1902.5663103256522,"finalAnchor":{"angle360":-180,"posX":-160,"posY":80.00000000000001}},{"length":23.561944901923447,"initialAnchor":{"angle360":-180,"posX":-160,"posY":80.00000000000001},"lengthUntilEnd":1926.1282552275757,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-225,"posX":-181.21320343559643,"posY":71.21320343559644}},{"length":23.561944901923447,"initialAnchor":{"angle360":-225,"posX":-181.21320343559643,"posY":71.21320343559644},"lengthUntilEnd":1949.690200129499,"radius":30,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-270,"posX":-190,"posY":50.00000000000002}},{"length":39.269908169872416,"initialAnchor":{"angle360":-270,"posX":-190,"posY":50.00000000000002},"lengthUntilEnd":1988.9601082993715,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-315,"posX":-175.35533905932738,"posY":14.644660940672644}},{"length":39.269908169872416,"initialAnchor":{"angle360":-315,"posX":-175.35533905932738,"posY":14.644660940672644},"lengthUntilEnd":2028.230016469244,"radius":50,"orientation":"RIGHT","angle":45,"finalAnchor":{"angle360":-360,"posX":-140,"posY":1.4210854715202004e-14}},{"length":140,"initialAnchor":{"angle360":-360,"posX":-140,"posY":1.4210854715202004e-14},"lengthUntilEnd":2168.230016469244,"finalAnchor":{"angle360":-360,"posX":0,"posY":-2.0079255660923888e-14}}],"width":502.42640687119285,"height":317.5735931288072,"initialAnchor":{"angle360":0,"posX":190,"posY":0}}');

    $scope.init = function () {

        setBaseAnchorAndScaleFactor();
        drawOnCanvas();
    };


    var drawOnCanvas = function () {

        var tracks = $scope.tracks.sections;
        var canvas = $scope.canvas;

        var ctx = canvas.getContext("2d");
        clear(canvas);
        ctx.fillRect(0, 0, 50, 50);
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
        var padding = 0;
        $scope.scaleFactor = 1.2;
        var defaultAnchor = {
            x: 500,
            y: 100
        };

        $scope.baseAnchor = {
            angle: 0,
            x: padding + defaultAnchor.x * $scope.scaleFactor,
            y: padding + defaultAnchor.y * $scope.scaleFactor
        };
    };


}]);