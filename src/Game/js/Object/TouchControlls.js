import CanvasObject from '../Abstract/CanvasObject';

import { APP_WIDTH, APP_HEIGHT } from '../../../Config';


export default function TouchControlls(game) {
    Object.customAssignObject(this, new CanvasObject);

    this.objectName = 'TouchControlls';

    this.zIndex = 10000;

    this.setCollisions(false);
    this.width = APP_WIDTH * 0.25;
    this.height = this.width;
    this.stickWidth = this.width / 2.5;
    this.stickHeight = this.width / 2.5;

    var originalCenterX = APP_WIDTH / 2;
    var originalCenterY = APP_HEIGHT - (this.height / 2 + this.height * 0.15);

    this.centerX = originalCenterX;
    this.centerY = originalCenterY;
    this.stickCenterX = originalCenterX;
    this.stickCenterY = originalCenterY;
    this.angleDegrees = null;

    this.draw = function (ctx) {
        if (this.disable || game.gameover) {
            return;
        }

        ctx.beginPath();
        ctx.arc(
            this.centerX,
            this.centerY,
            this.width / 2,
            0,
            2 * Math.PI
        );
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
            this.stickCenterX,
            this.stickCenterY,
            this.stickWidth / 2,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = "rgba(255, 255, 255, 0.30)";
        ctx.fill();
        ctx.stroke();

    };

    var startTouch = null;
    var currentTouch = null;
    var xDiff;
    var yDiff;
    var angle;
    var distance;
    var xNew;
    var yNew;

    this.touchStartCallback = function (e) {
        if (this.disable) {
            return;
        }

        if (!e.changedTouches) {
            return;
        }
        e.preventDefault();

        if (!startTouch) {
            startTouch = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };
        }

        this.centerX = startTouch.x;
        this.centerY = startTouch.y;
        this.stickCenterX = startTouch.x;
        this.stickCenterY = startTouch.y;
    };

    this.touchMoveCallback = function (e) {
        if (this.disable || !startTouch || !e.changedTouches) {
            return;
        }

        e.preventDefault();

        currentTouch = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
        };

        xDiff = currentTouch.x - startTouch.x;
        yDiff = currentTouch.y - startTouch.y;
        angle = Math.atan2(yDiff, xDiff);
        distance = Math.min((this.width - this.stickWidth) / 2, Math.hypot(xDiff, yDiff));
        xNew = distance * Math.cos(angle);
        yNew = distance * Math.sin(angle);

        this.stickCenterX = this.centerX + xNew;
        this.stickCenterY = this.centerY + yNew;

        this.angleDegrees = ((angle > 0 ? angle : (2 * Math.PI + angle)) * 360 / (2 * Math.PI)) * (Math.PI / 180);
    };

    this.touchEndCallback = function (e) {
        if (this.disable) {
            return;
        }

        startTouch = null;
        this.centerX = originalCenterX;
        this.centerY = originalCenterY;
        this.stickCenterX = originalCenterX;
        this.stickCenterY = originalCenterY;
        this.angleDegrees = null;
    };

    game.canvas.addEventListener("touchstart", this.touchStartCallback.bind(this));
    game.canvas.addEventListener("touchmove", this.touchMoveCallback.bind(this));
    game.canvas.addEventListener("touchend", this.touchEndCallback.bind(this));

    // game.canvas.addEventListener("touchcancel", this.touchEndCallback.bind(this));
    // game.addObject(this);
}