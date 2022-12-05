import CanvasObject from '../Abstract/CanvasObject';

export default function Background(game) {
    Object.customAssignObject(this, new CanvasObject);

    this.objectName = 'Background';
    this.x = 0;
    this.setCollisions(false);
    this.fastFoward = false;
    this.fastForwardSpeed = 10;

    var bgWidth = game.assets.getImage('background').width;
    var bgHeight = game.assets.getImage('background').height;

    var canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = game.getCanvasWidth();
    canvas.height = bgHeight;
    //var canvas = $("<canvas>", {"id":"testing"})[0];
    var ctx = canvas.getContext("2d");
    ctx.drawImage(
        game.assets.getImage('background'),
        (bgWidth - game.getCanvasWidth()) / 2,
        0,
        game.getCanvasWidth(),
        bgHeight,
        0,
        0,
        game.getCanvasWidth(),
        bgHeight
    );

    var bgX = 0;
    var bgY = -(bgHeight - game.getCanvasHeight());
    var bgY2 = -(bgHeight * 2 - game.getCanvasHeight());

    var margin;

    this.draw = function (ctx) {
        if (this.disable) {
            return;
        }

        if (this.fastFoward) {
            bgY += this.fastFoward;
            bgY2 += this.fastFoward;

            ctx.drawImage(
                canvas,
                0,
                bgY
            );

            ctx.drawImage(
                canvas,
                0,
                bgY2
            );

            if (bgY >= 0) {
                bgY = -(bgHeight - game.getCanvasHeight());
            }

            if (bgY2 >= 0) {
                bgY2 = -(bgHeight * 2 - game.getCanvasHeight());
            }

        } else {
            ctx.drawImage(
                canvas,
                0,
                bgY
            );

            ctx.drawImage(
                canvas,
                0,
                bgY2
            );
        }


    };

    // game.addObject(this);
}