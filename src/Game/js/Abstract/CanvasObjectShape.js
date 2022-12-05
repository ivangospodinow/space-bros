import CanvasObject from './CanvasObject';

export default function CanvasObjectShape(shapes) {
    Object.customAssignObject(this, new CanvasObject());

    this.shapes = {};
    this.globalAlpha = 1;
    this.globalAlphaIncrement = 0.05;
    this.degrees = 0;

    for (var i in shapes) {
        var ob = {};
        for (var p in shapes[i]) {
            ob[p] = shapes[i][p];
        }
        this.shapes[i] = ob;
    }

    shapes = undefined;

    this.draw = function (ctx) {
        if (this.disable) {
            return;
        }
        this.drawBeforeShare(ctx, this.shapes);
        this.drawShapes(ctx, this.shapes);
        this.drawAfterShare(ctx, this.shapes);

        this.ctx(ctx);
    };

    this.drawBeforeShare = function (ctx, shapes) {

    };

    this.drawAfterShare = function (ctx, shapes) {

    };


    this.drawBeforeShareInstance = function (ctx, shapes) {

    };

    this.drawAfterShareInstance = function (ctx, shapes) {

    };

    this.drawShapes = function (ctx, shapes) {
        // ctx.setTransform(1, 0, 0, 1, 0, 0);
        for (var i in shapes) {
            if (shapes[i].active) {
                ctx.globalAlpha = this.globalAlpha;

                this.drawBeforeShareInstance(ctx, shapes[i]);

                ctx.drawImage(
                    shapes[i].img,
                    shapes[i].sx,
                    shapes[i].sy,
                    shapes[i].width,
                    shapes[i].height,
                    this.x + shapes[i].x,
                    this.y + shapes[i].y,
                    shapes[i].width,
                    shapes[i].height
                );

                this.drawAfterShareInstance(ctx, shapes[i]);
            }
        }

        if (this.globalAlpha < 1) {
            this.globalAlpha += this.globalAlphaIncrement;
        }
    };

    this.refreshHitbox = function () {
        this.hitbox = [];
        for (var i in this.shapes) {
            if (this.shapes[i].active) {
                for (var s in this.shapes[i].hitbox) {
                    this.hitbox.push(this.shapes[i].hitbox[s]);
                }
            }
        }
    };
}
