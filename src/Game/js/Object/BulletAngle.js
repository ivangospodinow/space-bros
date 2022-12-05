import CanvasObject from '../Abstract/CanvasObject';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';


export default function BulletAngle(game, config) {
    Object.customAssignObject(this, new CanvasObject);
    Object.customAssignObject(this, new CanvasObjectHealth);

    this.objectName = 'BulletAngle';

    var self = this;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;
    this.angle = Math.atan2(config.ty - config.y, config.tx - config.x) + Math.PI / 2;
    this.speed = 5; //config.speed;
    this.step = config.step;
    this.type = undefined === config['type'] ? 'bullet' : config['type'];
    this.showAfter = undefined !== config.showAfter ? config.showAfter : 0;
    this.collisionType = undefined === config['step'] ? 'enemy' : config['collisionType'];
    this.shape = undefined !== config.shape ? config.shape : null;
    this.activeCollision = false;
    this.health = config.health[0];
    this.tmp = true;
    this.color = '#FFFAD4';

    this.setHitbox(
        [
            {
                x: 0,
                y: 0,
                width: this.width,
                height: this.height
            }
        ]
    );

    var count = 0;
    this.draw = function (ctx) {
        count++;

        this.x += this.speed * Math.cos(this.angle - (Math.PI / 2));
        this.y += this.speed * Math.sin(this.angle - (Math.PI / 2));

        if (this.showAfter <= 0) {
            ctx.save();
            ctx.translate(this.getCenterX(), this.getCenterY());
            // rotate
            ctx.rotate(this.angle);
            // translate back to actual position
            ctx.translate(-this.getCenterX(), -this.getCenterY());

            if (this.shape) {
                ctx.drawImage(
                    this.shape.img,
                    this.shape.sx,
                    this.shape.sy,
                    this.shape.width,
                    this.shape.height,
                    this.x,
                    this.y,
                    this.shape.width,
                    this.shape.height
                );
            } else {
                ctx.fillStyle = this.color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }

            ctx.restore();
        } else {
            this.showAfter--;
        }

        if (this.y > game.getCanvasHeight() || this.x < 0 || this.x > game.getCanvasWidth()) {
            this.active = false;
        }

        this.speed += this.step;
    };

    this.collision = function (object) {
        if (object.isActive() && object.getType() === this.collisionType) {
            this.damage(this, [object]);
        }
    };

    this.canCollision = function (object) {
        return object.getType() === this.collisionType;
    };
}
