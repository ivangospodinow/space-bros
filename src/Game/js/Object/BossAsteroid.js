import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import BossHp from '../Object/BossHp';
import BulletAngle from '../Object/BulletAngle';

export default function BossAsteroid(game, level) {
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'ship': {
                    active: true,
                    img: game.assets.getImage('boss-2'),
                    x: 0,
                    y: 0,
                    sx: 0,
                    sy: 0,
                    width: 186,
                    height: 180,
                    hitbox: [
                        {
                            x: 18,
                            y: 12,
                            width: 168,
                            height: 120
                        }
                    ],
                },
            }
        )
    );

    this.objectName = 'BossAsteroid';

    var self = this;

    this.width = 186;
    this.height = 191;
    this.x = game.getCanvasWidthCenter() - this.width / 2;
    this.y = - (this.height + 10);
    this.health = 7000;
    this.points = 5000;

    this.type = 'enemy';
    this.activeCollision = true;

    this.shootBullet = 100;

    game.addObject(new BossHp(game, this));

    var counter = 0;
    var counterLastShoot = 0;
    var allCounter = 0;
    var goToHeight = 10;
    var lastShoot = 0;

    var bulletType = -1;
    var bulletsAncles = [
        [],
        [],
        []
    ];
    bulletsAncles[0].push(0);
    bulletsAncles[0].push(game.getCanvasWidth() * 0);
    bulletsAncles[0].push(game.getCanvasWidth() * 0.50);
    bulletsAncles[0].push(game.getCanvasWidth());

    bulletsAncles[1].push(game.getCanvasWidth() * 0.10);
    bulletsAncles[1].push(game.getCanvasWidth() * 0.35);
    bulletsAncles[1].push(game.getCanvasWidth() * 0.80);

    bulletsAncles[2].push(game.getCanvasWidth() * 0.15);
    bulletsAncles[2].push(game.getCanvasWidth() * 0.45);
    bulletsAncles[2].push(game.getCanvasWidth() * 0.95);

    this.ctx = function (ctx) {
        // 
        this.shapes.ship.hitbox[0].height = parseInt(80 + Math.floor(Math.random() * 40) + 1);
        if (this.y <= goToHeight) {
            this.y += 0.5;
        }

        if (counter <= 50) {
            this.shapes.ship.img = game.assets.getImage('boss-2');
        } else if (counter >= 50 && counter <= 100) {
            this.shapes.ship.img = game.assets.getImage('boss-2-active');
        } else {
            counter = 0;
        }

        if (lastShoot >= 300) {
            bulletType++;
            if (bulletType > 2) {
                bulletType = 0;
            }
            for (var i in bulletsAncles[bulletType]) {

                game.addObject(new BulletAngle(game, {
                    x: this.getCenterX(),
                    y: this.getCenterY(),
                    tx: bulletsAncles[bulletType][i],
                    ty: game.getCanvasHeight(),
                    width: 10,
                    height: 22,
                    speed: 0.5,
                    step: 0.005,
                    collisionType: 'fighter',
                    type: 'enemy-bullet',
                    health: [100],
                    shape: {
                        active: true,
                        img: game.assets.getImage('boss-2'),
                        x: 0,
                        y: 0,
                        sx: 10,
                        sy: 45,
                        width: 10,
                        height: 22,
                        hitbox: []
                    },
                }));
            }
            lastShoot = 0;
        }

        counter++;
        lastShoot++;
        allCounter++;
    };


    this.takeDamage = function (object) {
        if (object.type === 'bullet' && allCounter - counterLastShoot >= 40) {
            counterLastShoot = allCounter;
            lastShoot = 0;
            bulletType++;
            if (bulletType > 2) {
                bulletType = 0;
            }
            for (var i in bulletsAncles[bulletType]) {

                game.addObject(new BulletAngle(game, {
                    x: object.getCenterX(),
                    y: object.getCenterY(),
                    tx: bulletsAncles[bulletType][i],
                    ty: game.getCanvasHeight(),
                    width: 10,
                    height: 22,
                    speed: 0.5,
                    step: 0.005,
                    collisionType: 'fighter',
                    type: 'enemy-bullet',
                    health: [100],
                    shape: {
                        active: true,
                        img: game.assets.getImage('boss-2'),
                        x: 0,
                        y: 0,
                        sx: 10,
                        sy: 45,
                        width: 10,
                        height: 22,
                        hitbox: []
                    },
                }));
            }
        }
    };

    this.destroy = function () {
        level.enemyDestroy(self);
    };

    this.refreshHitbox();
}
