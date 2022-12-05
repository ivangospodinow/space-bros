import Texts from './Level/Texts';
import Text from './Object/Text';
import Fighter from './Object/Fighter';
import FighterLevel from './Object/FighterLevel';
import Level from './Level/Level';
import Background from './Object/Background';
import TouchControlls from './Object/TouchControlls';

export default function Game(assets) {
    var self = this;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasWidthCenter = parseInt(canvasWidth / 2);
    var canvasHeight = canvas.height;
    var canvasHeightCenter = parseInt(canvasHeight / 2);

    var objects = [];
    var drawTimeout = 1000 / 60;
    this.fps = 60;
    this.fpsCounter = 0;
    this.bullets = 0;
    this.enemies = 0;
    this.cleanup = false;
    this.gameover = false;
    this.assets = assets;
    this.texts = null;
    this.points = 0;
    this.zIndex = 100;
    this.canvas = canvas;
    this.events = {};
    this.controls = new TouchControlls(this);

    this.getCanvasWidth = function () {
        return canvasWidth;
    };

    this.getCanvasWidthCenter = function () {
        return canvasWidthCenter;
    };

    this.getCanvasHeight = function () {
        return canvasHeight;
    };

    this.getCanvasHeightCenter = function () {
        return canvasHeightCenter;
    };

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    this.draw = function () {
        if (self.gameover) {
            //            ctx.clearRect(0, 0, canvasWidth, canvasHeight);;

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('GAME OVER', self.getCanvasWidthCenter() - 75, self.getCanvasHeightCenter() - 10);

            return;
        }

        setTimeout(self.draw, drawTimeout);

        self.fpsCounter++;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var i in objects) {

            if (objects[i].isActive()) {
                objects[i].draw(ctx);
            }
        }

        /**
         * Doing collision
         */
        for (var i in objects) {
            if (objects[i].isActive()
                && objects[i].canActiveCollision()) {
                for (var c in objects) {
                    if (c !== i
                        && objects[c].isActive()
                        && objects[c].canCollision(objects[i])
                        && objects[i].canCollision(objects[c])
                        && self.willCollision(objects[i], objects[c])
                    ) {
                        objects[i].collision(objects[c]);
                    }

                    if (!objects[i].isActive()
                        && !objects[i].isDestroyed()) {
                        objects[i].destroy();
                        objects[i].setDestroyed(true);
                    }
                    if (!objects[c].isActive()
                        && !objects[c].isDestroyed()) {
                        objects[c].destroy();
                        objects[c].setDestroyed(true);
                    }
                }
            }
        }

        if (!self.cleanup) {
            self.cleanup = true;
            var newObjects = [];
            for (var i in objects) {
                if (objects[i].isActive()) {
                    newObjects.push(objects[i]);
                }
            }
            objects = newObjects;
            newObjects = undefined;
            setTimeout(function () {
                self.cleanup = false;
            }, 1000);
        }

        //        requestAnimationFrame(self.draw);
        //        setTimeout(self.draw, drawTimeout);
    };

    this.addObject = function (object) {
        if (undefined === object.zIndex) {
            object.zIndex = this.zIndex;
        }

        if (undefined === object.tmp) {
            object.tmp = false;
        }

        objects.push(object);
        if (object.tmp === true) {
            return;
        }

        objects.sort(function (a, b) {
            if (a.zIndex < b.zIndex) {
                return -1;
            }
            if (a.zIndex > b.zIndex) {
                return 1;
            }
            return 0;
        });
    };

    this.getCollision = function (object, prevX, prevY) {
        for (var i in objects) {
            if (objects[i].canCollision(object)
                && objects[i] !== object) {
                if (self.willCollision(object, objects[i])) {

                    return objects[i];
                }
            }
        }

        return false;
    };

    this.willCollision = function (a, b) {
        if (undefined === a.hitbox
            || undefined === b.hitbox
            || !a.hitbox.length
            || !b.hitbox.length) {
            return false;
        }

        for (var ia in a.hitbox) {
            var hba = {
                x: a.hitbox[ia].x + a.x,
                y: a.hitbox[ia].y + a.y,
                width: a.hitbox[ia].width,
                height: a.hitbox[ia].height
            };

            for (var ib in b.hitbox) {
                var hbb = {
                    x: b.hitbox[ib].x + b.x,
                    y: b.hitbox[ib].y + b.y,
                    width: b.hitbox[ib].width,
                    height: b.hitbox[ib].height
                };

                if (hba.x < hbb.x + hbb.width &&
                    hba.x + hba.width > hbb.x &&
                    hba.y < hbb.y + hbb.height &&
                    hba.height + hba.y > hbb.y) {
                    return true;
                }
            }
        }

        return false;
    };

    this.getObjects = function () {
        return objects;
    };

    this.run = function () {
        this.addObject(new Background(this));
        this.addObject(this.controls);


        //        this.startGame();
        this.draw();
    };

    this.startGame = function (type) {
        this.texts = new Texts(this, new Text(this));
        var fighter = new Fighter(self, {
            controls: true,
            canLevel: true,
        });
        this.addObject(fighter);

        this.addObject(new FighterLevel(self, fighter));

        var level = new Level(self, fighter, type);
        level.start();

        setInterval(function () {
            self.fps = self.fpsCounter;
            self.fpsCounter = 0;
        }, 1000);
    };

    this.startGameChallange = function () {
        this.startGame('challange');
    };

    this.onkeydown = function (callback) {
        if (undefined === self.events['onkeydown']) {
            self.events['onkeydown'] = [];
        }
        self.events['onkeydown'].push(callback);
    };

    this.onkeyup = function (callback) {
        if (undefined === self.events['onkeyup']) {
            self.events['onkeyup'] = [];
        }
        self.events['onkeyup'].push(callback);
    };

    this.getFontSize = function (size) {
        return size / 800 * window.innerWidth;
    }

    document.body.onkeydown = function (e) {
        if (undefined !== self.events['onkeydown']) {
            for (var i in self.events['onkeydown']) {
                self.events['onkeydown'][i].call(window, e);
            }
        }
    };

    document.body.onkeyup = function (e) {
        if (undefined !== self.events['onkeyup']) {
            for (var i in self.events['onkeyup']) {
                self.events['onkeyup'][i].call(window, e);
            }
        }
    };

    // var touch = null;
    // var touchX;
    // var touchY;
    // var touchKeys = [];
    // var dx = '';
    // var dy = '';
    // var direction = '';
    // var prevDirection = '';

    // this.touchStart = function (e) {
    //     e.preventDefault();
    //     // console.log(e)
    //     // console.log('start')
    //     if (e.changedTouches) {

    //         touch = {
    //             x: e.changedTouches[0]['clientX'],
    //             y: e.changedTouches[0]['clientY'],
    //         };
    //     }
    // };

    // this.touchMove = function (e) {
    //     e.preventDefault();


    //     if (e.changedTouches) {
    //         touchX = e.changedTouches[0]['clientX'];
    //         touchY = e.changedTouches[0]['clientY'];
    //     }

    //     var maxDiff = 100;
    //     var xDiff = touchX - touch.x;
    //     var yDiff = touchY - touch.y;
    //     var angle = Math.atan2(yDiff, xDiff);

    //     var distance = Math.min(maxDiff, Math.hypot(xDiff, yDiff));
    //     var xNew = parseFloat(distance * Math.cos(angle)).toFixed(2);
    //     var yNew = parseFloat(distance * Math.sin(angle)).toFixed(2);

    //     // console.log(`translate3d(${xNew}px, ${yNew}px, 0px)`)

    //     if (xNew > 5) {
    //         xNew = 5;
    //     } else if (xNew < -5) {
    //         xNew = - 5;
    //     } else if (xNew === 1) {
    //         xNew = 5;
    //     } else if (xNew === -1) {
    //         xNew = -5;
    //     }

    //     if (yNew > 5) {
    //         yNew = 5;
    //     } else if (yNew < -5) {
    //         yNew = -5;
    //     } else if (yNew === 1) {
    //         yNew = 5;
    //     } else if (yNew === -1) {
    //         yNew = -5;
    //     }


    //     // console.log(xNew, yNew)
    //     touchKeys = [];

    //     if (touch.x < touchX) {
    //         dx = 'right';
    //         touchKeys.push({ key: 39, event: 'onkeydown' });
    //         touchKeys.push({ key: 37, event: 'onkeyup' });
    //     } else if (touch.x > touchX) {
    //         dx = 'left';
    //         touchKeys.push({ key: 39, event: 'onkeyup' });
    //         touchKeys.push({ key: 37, event: 'onkeydown' });
    //     }

    //     if (touch.y < touchY) {
    //         dy = 'down';
    //         touchKeys.push({ key: 40, event: 'onkeydown' });
    //         touchKeys.push({ key: 38, event: 'onkeyup' });
    //     } else if (touch.y > touchY) {
    //         dy = 'up';
    //         touchKeys.push({ key: 40, event: 'onkeyup' });
    //         touchKeys.push({ key: 38, event: 'onkeydown' });
    //     }

    //     for (var k in touchKeys) {
    //         if (undefined !== self.events[touchKeys[k]['event']]) {
    //             for (var i in self.events['onkeyup']) {
    //                 self.events[touchKeys[k]['event']][i].call(window, {
    //                     keyCode: touchKeys[k]['key'],
    //                     xNew: xNew,
    //                     yNew: yNew,
    //                 });
    //             }
    //         }
    //     }

    //     touch = {
    //         x: touchX,
    //         y: touchY,
    //     };
    // };

    // this.touchEnd = function (e) {
    //     e.preventDefault();
    //     touch = null;
    //     if (undefined !== self.events['onkeyup']) {
    //         for (var i in self.events['onkeyup']) {
    //             self.events['onkeyup'][i].call(window, { keyCode: 37 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 38 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 39 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 40 });
    //         }
    //     }
    // };

    // this.touchCancel = function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     // console.log('cancel')
    //     touch = null;
    //     if (undefined !== self.events['onkeyup']) {
    //         for (var i in self.events['onkeyup']) {
    //             self.events['onkeyup'][i].call(window, { keyCode: 37 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 38 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 39 });
    //             self.events['onkeyup'][i].call(window, { keyCode: 40 });
    //         }
    //     }
    // };


    // canvas.addEventListener("touchstart", this.touchStart);
    // canvas.addEventListener("touchmove", this.touchMove);
    // canvas.addEventListener("touchend", this.touchEnd);
    // canvas.addEventListener("touchcancel", this.touchCancel);
}