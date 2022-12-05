import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';


export default function Asteroid(game, level, shape) {

    Object.customAssignObject(this, new CanvasObjectShape([shape]));
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());

    this.objectName = 'Asteroid';
    var self = this;
    this.width = shape.width;
    this.height = shape.height;
    this.x = 0;
    this.y = 0;
    this.type = 'enemy';
    this.health = shape.health;
    this.points = shape.health;
    this.acceleration = shape.acceleration;
    this.hitbox = shape.hitbox;

    var killed = true;

    this.speedX = shape.speedX;
    this.speedY = shape.speedY;
    this.bouce = null;
    this.degrees = game.getRandomArbitrary(0, 360);
    this.rotateSpeed = game.getRandomArbitrary(0.1, 1);
    this.zIndex += this.acceleration;


    this.ctx = function (ctx) {

        this.degrees += this.rotateSpeed;
        if (this.degrees > 360) {
            this.degrees = 0;
        }

        this.speedY += this.acceleration;

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > 0 && this.y > game.getCanvasHeight()) {
            this.active = false;
            killed = false;
        }
    };

    this.drawBeforeShareInstance = function (ctx, shapes) {
        ctx.save();
        ctx.translate(this.getCenterX(), this.getCenterY());
        // rotate
        ctx.rotate(this.degrees * (Math.PI / 180));
        // translate back to actual position
        ctx.translate(-this.getCenterX(), -this.getCenterY());

    };

    this.drawAfterShareInstance = function (ctx, shapes) {

        ctx.restore();
    }

    this.takeDamage = function (object) {
        //        this.globalAlpha = 0.5;
    };

    this.destroy = function () {
        if (killed) {
            game.enemies++;
        } else {
            this.points = 0;
        }

        //        game.addObject(new EnemyDeathBullet(game, self));
        level.enemyDestroy(self);
    };
}
