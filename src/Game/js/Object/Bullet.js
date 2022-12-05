import CanvasObject from '../Abstract/CanvasObject';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import BulletImpact from '../Object/BulletImpact';

export default function Bullet(game, fighter, config) {
    Object.customAssignObject(this, new CanvasObject);
    Object.customAssignObject(this, new CanvasObjectHealth);

    this.objectName = 'Bullet';

    var self = this;
    this.active = true;
    this.width = undefined === config['width'] ? 2 : config['width'];
    this.height = undefined === config['height'] ? 4 : config['height'];
    this.x = fighter.getX() + config.x;
    this.y = fighter.getY() + config.y;
    this.type = undefined === config['type'] ? 'bullet' : config['type'];
    this.activeCollision = true;
    this.health = config.health[0];
    this.color = undefined === config.color ? null : config.color[0];
    this.step = undefined === config['step'] ? -1 : config['step'];
    this.collisionType = undefined === config['step'] ? 'enemy' : config['collisionType'];
    this.shape = undefined !== config.shape ? config.shape : null;
    this.tmp = true;
    this.fighterSpeedY = fighter.currentSpeedY < 0 ? fighter.currentSpeedY : 0;

    this.draw = function (ctx) {
        if (this.disable) {
            return;
        }

        ctx.beginPath();
        if (!this.damageDone && this.color) {
            if (Math.abs(this.step) >= 8) {
                this.color = config.color[2];
                this.health = config.health[2];
            } else if (Math.abs(this.step) >= 4) {
                this.color = config.color[1];
                this.health = config.health[1];
            }
        }

        if (this.shape) {
            ctx.drawImage(
                this.shape.img,
                this.shape.sx,
                this.shape.sy,
                this.shape.width,
                this.shape.height,
                this.x + this.shape.x,
                this.y + this.shape.y,
                this.shape.width,
                this.shape.height
            );
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        }
        // console.log(this.step)
        if (Math.abs(this.step) < Math.abs(this.fighterSpeedY)) {
            this.step = this.fighterSpeedY;
        }
        this.step += config.speed;

        self.y += this.step;
        self.height += config.heightAdd;

        if (self.y + self.height <= 0
            || self.height + self.y > game.getCanvasHeight()) {
            self.setActive(false);
        }

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
        ctx.stroke();
    };

    this.collision = function (object) {
        if (object.isActive() && object.getType() === this.collisionType) {
            this.damage(this, [object]);
            //            self.setActive(false);
            //            object.setActive(false);
        }
    };

    this.canCollision = function (object) {
        return object.getType() === this.collisionType;
    };

    this.destroy = function () {
        if (this.damageDone) {
            game.addObject(new BulletImpact(game, this));
        }
    };

    this.takeDamage = function (object) {
        if (this.damageDone) {
            game.texts.addDamageText(this);
        }
    };
}
