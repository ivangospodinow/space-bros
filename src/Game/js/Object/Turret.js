import CanvasObject from '../Abstract/CanvasObject';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import BulletAngle from '../Object/BulletAngle';

export default function Turret(game, fighter, config) {
    Object.customAssignObject(this, new CanvasObject());
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());

    this.objectName = 'Turret';

    var self = this;
    this.img = undefined !== config['img'] ? config['img'] : game.assets.getImage('turret-1');
    this.width = this.img.width;
    this.height = this.img.height;
    this.x = 700;
    this.y = 300;
    this.health = 50;
    this.points = 50;
    this.type = 'enemy';
    this.angle = 0;
    this.fire = true;
    this.bulletWidth = undefined !== config['bulletWidth'] ? config['bulletWidth'] : 3;
    this.bulletHeight = undefined !== config['bulletHeight'] ? config['bulletHeight'] : 5;
    this.bulletSpeed = undefined !== config['bulletSpeed'] ? config['bulletSpeed'] : 0.4;
    this.bulletStep = undefined !== config['bulletStep'] ? config['bulletStep'] : 0.005;
    this.bulletShowAfter = undefined !== config['bulletShowAfter'] ? config['bulletShowAfter'] : 5;

    var shoot = 0;
    var goToAngle = null;
    var goToAngleStep = null;
    var goToAngleFrames = null;
    var goToAngleFramesCount = 20;

    this.draw = function (ctx) {
        //        if (this.angle < 0) {
        //            this.angle = Math.PI * 1.5 + (Math.PI / 2 - Math.abs(this.angle))
        //        }

        if (shoot === 120 && this.fire) {
            goToAngle = Math.atan2(fighter.y - this.y, fighter.x - this.x) + Math.PI / 2;
            if (goToAngle < 0) {
                goToAngle = Math.PI * 1.5 + (Math.PI / 2 - Math.abs(goToAngle));
            }

            if (goToAngle !== this.angle) {
                if (this.angle < Math.PI && goToAngle > Math.PI) {
                    if (this.angle === 0) {
                        this.angle = Math.PI * 2;
                    }
                }

                goToAngleStep = (this.angle > goToAngle ? -(this.angle - goToAngle) : goToAngle - this.angle) / goToAngleFramesCount;

                goToAngleFrames = goToAngleFramesCount;
            }
            shoot = 0;
        }
        if (false === this.fire) {
            shoot = 0;
        }

        if (goToAngle) {
            this.angle += goToAngleStep;
            goToAngleFrames--;
            if (goToAngleFrames <= 0) {
                this.angle = goToAngle;
                goToAngle = null;
                game.addObject(new BulletAngle(game, {
                    x: this.getCenterX(),
                    y: this.getCenterY(),
                    tx: fighter.getCenterX(),
                    ty: fighter.y,
                    width: this.bulletWidth,
                    height: this.bulletHeight,
                    speed: this.bulletSpeed,
                    step: this.bulletStep,
                    showAfter: this.bulletShowAfter,
                    health: [100],
                    collisionType: 'fighter',
                    type: 'enemy-bullet',
                }));
            }
        }

        // this.angle += 0.1;;
        //  if (this.angle >= Math.PI * 2) {
        //     // this.angle = 0;
        //  }

        ctx.save();
        ctx.translate(this.getCenterX(), this.getCenterY());
        ctx.rotate(this.angle);
        ctx.translate(-this.getCenterX(), -this.getCenterY());
        ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
        ctx.restore();

        shoot++;
    };

    this.ctx = function (ctx) {

    };

    //    this.collision = function (object)
    //    {
    //        if (object.isActive() && (object.getType() === 'fighter' || object.getType() === 'bullet'))
    //        {
    //            this.damage(this, [object]);
    //        }
    //    };
    //
    //    this.canCollision = function (object)
    //    {
    //        return object.getType() === 'fighter' || object.getType() === 'bullet';
    //    };

    /**
     *         | 0
     *Math.PI+ }
     *Math.PI /|
     * 2       |
     *         |      Math.PI / 2
     * -----------------
     *         |
     *         |
     *  Math.PI|
     *         
     * @param {type} from
     * @param {type} to
     * @param {type} step
     * @returns {Number}
     */
    this.getNextAngle = function (from, to, step) {

        return 0;
    };
}
