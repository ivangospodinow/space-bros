import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import Bullet from '../Object/Bullet';

export default function Fighter(game, config) {

    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'thrust': {
                    active: false,
                    img: game.assets.getImage('ships'),
                    x: 11,
                    y: 23,
                    sx: 30,
                    sy: 50,
                    width: 20,
                    height: 50,
                    hitbox: [],
                },
                'ship': {
                    active: true,
                    img: game.assets.getImage('ships'),
                    x: 0,
                    y: 0,
                    sx: 20,
                    sy: 5,
                    width: 37,
                    height: 42,
                    hitbox: [
                        {
                            x: 0,
                            y: 0,
                            width: 37,
                            height: 42
                        }
                    ],
                },
                'leftWeapon': {
                    active: false,
                    img: game.assets.getImage('ships'),
                    x: -8,
                    y: -6,
                    sx: 0,
                    sy: 0,
                    width: 13,
                    height: 45,
                    hitbox: [
                        {
                            x: 0,
                            y: 0,
                            width: 13,
                            height: 45
                        }
                    ],
                },
                'rightWeapon': {
                    active: false,
                    img: game.assets.getImage('ships'),
                    x: 37,
                    y: -6,
                    sx: 72,
                    sy: 0,
                    width: 13,
                    height: 45,
                    hitbox: [
                        {
                            x: 0,
                            y: 0,
                            width: 13,
                            height: 45
                        }
                    ],
                },
            }
        )
    );

    this.objectName = 'Fighter';

    var self = this;

    var key = {
        32: null, // space
        39: null,
        37: null,
        38: null,
        40: null,
    };
    var moveStep = 4;

    this.width = 37;
    this.height = 92;
    this.x = game.getCanvasWidthCenter() - this.width / 2;
    this.y = game.getCanvasHeight() / 1.5;
    this.type = 'fighter';
    this.activeCollision = true;
    this.level = 1;
    this.nextLevelPoints = 1000;
    this.controls = undefined === config.controls ? true : config.controls;
    this.canLevel = undefined === config.canLevel ? true : config.canLevel;
    this.zIndex = 9999;
    this.currentSpeedY = 0;

    this.levels = {
        1: {
            points: 0,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                }
            ],
            shapes: ['ship'],
        },
        2: {
            points: 1000,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                }
            ],
            shapes: ['ship'],
        },
        3: {
            points: 2000,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                }
            ],
            shapes: ['ship'],
        },
        4: {
            points: 4000,
            bullets: [
                {
                    x: -1,
                    y: -12,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
        5: {
            points: 8000,
            bullets: [
                {
                    x: -1,
                    y: -12,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
        6: {
            points: 16000,
            bullets: [
                {
                    x: -1,
                    y: -12,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
        7: {
            points: 32000,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                },
                {
                    x: -1,
                    y: -12,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.15,
                    heightAdd: 0.15,
                    health: [20, 22, 24],
                    color: ['#FFFFFF', '#faf3c2', '#FFFAD4']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
        8: {
            points: 64000,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                },
                {
                    x: -1,
                    y: -12,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.16,
                    heightAdd: 0.16,
                    health: [24, 26, 28],
                    color: ['#FFFAD4', '#FFF39C', '#FFE730']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
        9: {
            points: 128000,
            bullets: [
                {
                    x: 18,
                    y: -10,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                },
                {
                    x: -1,
                    y: -12,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                },
                {
                    x: 37,
                    y: -12,
                    speed: -0.17,
                    heightAdd: 0.17,
                    health: [28, 30, 32],
                    color: ['#FFB5B5', '#FA6464', '#FC0D0D']
                }
            ],
            shapes: ['ship', 'leftWeapon', 'rightWeapon'],
        },
    };

    var buttetFrames = 10;

    this.ctx = function (ctx) {
        ctx.fillStyle = 'red';

        if (this.controls) {
            game.controls.disable = false;

            if (null !== game.controls.angleDegrees) {
                self.x += moveStep * Math.cos(game.controls.angleDegrees);
                this.currentSpeedY = moveStep * Math.sin(game.controls.angleDegrees);
                self.y += this.currentSpeedY;
                this.shapes['thrust'].active = true;
            } else {
                this.shapes['thrust'].active = false;
            }

            if (this.x > game.getCanvasWidth() - self.width / 2) {
                this.x = game.getCanvasWidth() - self.width / 2;
            } else if (this.x < 0 - self.width / 2) {
                this.x = 0 - self.width / 2
            }

            if (this.y > game.getCanvasHeight() - self.height / 2) {
                this.y = game.getCanvasHeight() - self.height / 2;
            } else if (this.y < 0 - self.height / 2) {
                this.y = 0 - self.height / 2
            }
        } else {
            game.controls.disable = true;
        }

        buttetFrames--;

        if (!this.disable && this.controls && buttetFrames <= 0) {
            buttetFrames = 12;
            for (var i in self.levels[self.level].bullets) {
                game.addObject(new Bullet(game, self, self.levels[self.level].bullets[i]));
                game.bullets++;
            }
        }

        if (game.points >= this.nextLevelPoints) {
            this.levelUp();
        }
    };

    this.canCollision = function (object) {
        return object.getType() === 'enemy'
            || object.getType() === 'boss'
            || object.getType() === 'enemy-bullet';
    };

    this.collision = function (object) {
        this.takeDamage(object);
    };

    this.takeDamage = function (object) {

        if (self.type == 'fighter') {
            self.active = false;
            object.active = false;
            game.gameover = true;
        } else {
            self.active = false;
            object.active = false;
        }
    };

    this.levelUp = function () {
        if (!this.canLevel) {
            return;
        }
        this.level++;
        if (undefined !== this.levels[this.level + 1]) {
            this.nextLevelPoints = this.levels[this.level + 1].points;
        } else {
            this.nextLevelPoints = 9999999999;
        }

        this.refreshHitbox();

        for (var i in this.levels[this.level].shapes) {
            this.shapes[this.levels[this.level].shapes[i]].active = true;
        }
    };

    this.refreshHitbox();
}
