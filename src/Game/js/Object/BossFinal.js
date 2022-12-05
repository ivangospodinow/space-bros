import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import BossHp from '../Object/BossHp';
import Bullet from '../Object/Bullet';

export default function BossFinal(game) {
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'ship': {
                    active: true,
                    img: game.assets.getImage('final-boss'),
                    x: 0,
                    y: 0,
                    sx: 0,
                    sy: 235,
                    width: 182,
                    height: 167,
                    hitbox: [
                        {
                            x: 50,
                            y: 50,
                            width: 70,
                            height: 120
                        },
                        {
                            x: 0,
                            y: 50,
                            width: 70,
                            height: 28
                        },
                        {
                            x: 120,
                            y: 50,
                            width: 70,
                            height: 28
                        }
                    ],
                },
                'turret': {
                    active: true,
                    img: game.assets.getImage('final-boss'),
                    x: 65,
                    y: 25,
                    sx: 0,
                    sy: 428,
                    width: 51,
                    height: 98,
                    hitbox: [

                    ],
                },
            }
        )
    );

    this.objectName = 'BossFinal';

    var self = this;

    this.width = 182;
    this.height = 167;
    this.type = 'enemy';
    this.health = 5000;
    this.points = 5000;
    this.shootBullet = 0;
    this.bulletWidth = 2;
    this.bulletHeight = 4;
    this.bulletStep = 0.5;
    this.bulletSpeed = 0.10;
    this.bulletHeightAdd = 0.15;

    this.pattern = null;
    var pattern = [
        {
            active: true,
            x: 0 + 10 + this.width / 2,
            y: 0 + 10 + this.height,
            speedX: 1,
            speedY: 0,
            activeX: true,
            activeY: false,
        },
        {
            active: false,
            x: game.getCanvasWidth() - (10 + this.width / 2),
            y: game.getCanvasWidth() - (10 + this.height),
            speedX: 1,
            speedY: 0,
            activeX: false,
            activeY: false,
        },
    ];

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

        if (this.shootBullet === 50 || this.shootBullet === 75 || this.shootBullet === 100) {
            game.addObject(
                new Bullet(
                    game,
                    self,
                    {
                        x: 53,
                        y: 165,
                        width: this.bulletWidth,
                        height: this.bulletHeight,
                        step: this.bulletStep,
                        speed: this.bulletSpeed,
                        heightAdd: this.bulletHeightAdd,
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
                        x: 130,
                        y: 165,
                        width: this.bulletWidth,
                        height: this.bulletHeight,
                        step: this.bulletStep,
                        speed: this.bulletSpeed,
                        heightAdd: this.bulletHeightAdd,
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
            this.shootBullet = 150;
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
        this.turret.active = false;
    };

    this.refreshHitbox();
    game.addObject(new BossHp(game, this));
}
