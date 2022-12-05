import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import Bullet from '../Object/Bullet';

export default function Enemy(game, level, shape) {
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'ship': shape,
            }
        )
    );

    this.objectName = 'Enemy';

    var self = this;

    this.width = shape.width;
    this.height = shape.height;
    this.x = game.getCanvasWidthCenter() - this.width / 2;
    this.y = 50;
    this.health = shape.health;
    this.points = shape.health;
    this.type = 'enemy';
    this.hitbox = shape.hitbox;
    this.shootBullet = 100
    this.shootAt = 100;
    this.delayShoot = 0;

    var counter = 0;

    this.ctx = function (ctx) {
        if (this.shootBullet <= 0) {
            this.shootBullet = 100;
        }

        if (this.shootAt == this.shootBullet && counter >= this.delayShoot) {
            game.addObject(
                new Bullet(
                    game,
                    self,
                    {
                        x: 29,
                        y: 68,
                        width: 2,
                        height: 8,
                        step: 1,
                        speed: 0.15,
                        heightAdd: 0.05,
                        health: [20, 22, 24],
                        color: ['#FFFFFF', '#faf3c2', '#FFFAD4'],
                        collisionType: 'fighter',
                        type: 'enemy-bullet',
                    }
                )
            );
        }

        if (this.delayShoot > 0 && counter >= this.delayShoot) {
            this.shootBullet = 100;
            this.delayShoot = 0;
        }

        this.y += 0.2;

        if (this.y > game.getCanvasHeight()) {
            this.active = false;
        }

        counter++;
        this.shootBullet--;
    };

    this.collision = function (object) {
        if (object.isActive() && (object.getType() === 'fighter' || object.getType() === 'bullet')) {
            this.damage(this, [object]);
        }
    };

    this.canCollision = function (object) {
        return object.getType() === 'fighter' || object.getType() === 'bullet';
    };

    this.destroy = function () {
        game.enemies++;
        level.enemyDestroy(self);
    };
}
