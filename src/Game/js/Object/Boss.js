import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import BossHp from '../Object/BossHp';
import Bullet from '../Object/Bullet';

export default function Boss(game, level) {
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'ship': {
                    active: true,
                    img: game.assets.getImage('boss-1'),
                    x: 0,
                    y: 0,
                    sx: 0,
                    sy: 0,
                    width: 105,
                    height: 102,
                    hitbox: [
                        {
                            x: 0,
                            y: 0,
                            width: 105,
                            height: 102
                        }
                    ],
                },
            }
        )
    );

    this.objectName = 'Boss';

    var self = this;

    this.width = 105;
    this.height = 102;
    this.x = game.getCanvasWidthCenter() - this.width / 2;
    this.y = - (this.height + 10);
    this.health = 5000;
    this.points = 5000;

    this.type = 'enemy';
    this.activeCollision = true;

    this.pattern = null;
    var pattern = [
        {
            active: true,
            x: 0 + 10 + this.width,
            y: 0 + 10 + this.height,
            speedX: 2,
            speedY: 0,
            activeX: true,
            activeY: false,
        },
        {
            active: false,
            x: game.getCanvasWidth() - (10 + this.width),
            y: game.getCanvasWidth() - (10 + this.height),
            speedX: 2,
            speedY: 0,
            activeX: false,
            activeY: false,
        },
    ];

    this.shootBullet = 100;

    game.addObject(new BossHp(game, this));

    this.ctx = function (ctx) {
        if (null === this.pattern) {
            if (this.height >= this.y + this.height - 5) {
                this.y += 1;
            } else {
                this.pattern = pattern;
            }
        } else {
            for (var i in this.pattern) {
                if (this.pattern[i].active) {

                    /*       .
                     *       .
                     *  < ........
                     *       .
                     *       .
                     */
                    if (this.x + this.width / 2 >= this.pattern[i].x) {
                        if (this.pattern[i].speedX > 0) {
                            this.pattern[i].speedX = -this.pattern[i].speedX;
                        }
                    } else {
                        if (this.pattern[i].speedX < 0) {
                            this.pattern[i].speedX = -this.pattern[i].speedX;
                        }
                    }

                    this.x += this.pattern[i].speedX;

                    if (this.pattern[i].speedX < 0
                        && this.x + this.width / 2 <= this.pattern[i].x) {
                        this.nextPattern(i);
                        break;
                    }

                    break;
                }
            }
        }

        // if (this.shootBullet === 40 || this.shootBullet === 60 || this.shootBullet === 80 || this.shootBullet === 100) {
        if (this.shootBullet === 50 || this.shootBullet === 75 || this.shootBullet === 100) {
            game.addObject(
                new Bullet(
                    game,
                    self,
                    {
                        x: 7,
                        y: 80,
                        width: 4,
                        height: 8,
                        step: 1,
                        speed: 0.15,
                        heightAdd: 0.15,
                        health: [20, 22, 24],
                        color: ['#FFFFFF', '#faf3c2', '#FFFAD4'],
                        collisionType: 'fighter',
                        type: 'enemy-bullet',
                    }
                )
            );
            game.addObject(
                new Bullet(
                    game,
                    self,
                    {
                        x: 97,
                        y: 80,
                        width: 4,
                        height: 8,
                        step: 1,
                        speed: 0.15,
                        heightAdd: 0.15,
                        health: [20, 22, 24],
                        color: ['#FFFFFF', '#faf3c2', '#FFFAD4'],
                        collisionType: 'fighter',
                        type: 'enemy-bullet',
                    }
                )
            );
        }
        this.shootBullet--;
        if (this.shootBullet <= 0) {
            this.shootBullet = 100;
        }
    };

    this.nextPattern = function (i) {
        i = parseInt(i);
        this.pattern[i].active = false;
        this.pattern[i].activeX = false;
        this.pattern[i].activeY = false;

        if (undefined !== this.pattern[i + 1]) {
            this.pattern[i + 1].active = true;
            this.pattern[i + 1].activeX = true;
            this.pattern[i + 1].activeY = false;
        } else {
            this.pattern[0].active = true;
            this.pattern[0].activeX = true;
            this.pattern[0].activeY = false;
        }
    };

    this.destroy = function () {
        game.enemies++;
        level.enemyDestroy(self);
    };

    this.refreshHitbox();
}
