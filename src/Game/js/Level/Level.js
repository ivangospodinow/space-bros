import Challange from './Scenario/Challange';

import Intro from './Scenario/Intro';
import Level1 from './Scenario/Level1';
import Level1Outro from './Scenario/Level1Outro';
import Level2Intro from './Scenario/Level2Intro';
import Level2 from './Scenario/Level2';
import Level2Outro from './Scenario/Level2Outro';
import Level3 from './Scenario/Level3';
import Level3Outro from './Scenario/Level3Outro';

export default function Level(game, fighter, type) {
    var self = this;
    var inited = false;

    var usedSpaces = [];

    this.currentEnemies = 0;
    this.killedEnemies = 0;
    // @TODO
    this.currentScenario = -1;

    this.scenarios = [];
    this.scenarios.push(Intro);
    this.scenarios.push(Level1);
    this.scenarios.push(Level1Outro);
    this.scenarios.push(Level2Intro);
    this.scenarios.push(Level2);
    this.scenarios.push(Level2Outro);
    this.scenarios.push(Level3);
    this.scenarios.push(Level3Outro);


    this.fighter = fighter;
    this.fighter.disable = true;

    var types = {};
    this.types = types;
    types['enemy-1'] = {
        active: true,
        health: 500,
        img: game.assets.getImage('enemy-1'),
        x: 0, //game.getCanvasWidthCenter() - this.width / 2,
        y: 0,//game.getCanvasHeight() - (this.height + 10),
        sx: 0,
        sy: 0,
        width: game.assets.getImage('enemy-1').width,
        height: game.assets.getImage('enemy-1').height,
        hitbox: [
            {
                x: 6,
                y: 31,
                width: 49,
                height: 36
            }
        ],
    };
    types['size1'] = {
        active: true,
        health: 1,
        speedX: 0,
        speedY: 1,
        acceleration: 0,
        img: game.assets.getImage('asteroid-1'),
        x: 0,
        y: 0,
        sx: 0,
        sy: 0,
        width: game.assets.getImage('asteroid-1').width,
        height: game.assets.getImage('asteroid-1').height,
        hitbox: [
            {
                x: 10,
                y: 11,
                width: 11,
                height: 11
            }
        ],
    };
    types['size4'] = {
        active: true,
        health: 60,
        speedX: 0,
        speedY: 0.8,
        acceleration: 0,
        img: game.assets.getImage('asteroid-4'),
        x: 0,
        y: 0,
        sx: 0,
        sy: 0,
        width: game.assets.getImage('asteroid-4').width,
        height: game.assets.getImage('asteroid-4').height,
        hitbox: [
            {
                x: 13,
                y: 8,
                width: 43,
                height: 29
            }
        ],
    };
    types['size5'] = {
        active: true,
        health: 90,
        speedX: 0,
        speedY: 0.6,
        acceleration: 0,
        img: game.assets.getImage('asteroid-5'),
        x: 0,
        y: 0,
        sx: 0,
        sy: 0,
        width: game.assets.getImage('asteroid-5').width,
        height: game.assets.getImage('asteroid-5').height,
        hitbox: [
            {
                x: 10,
                y: 11,
                width: 50,
                height: 35
            }
        ],
    };
    types['size8'] = {
        active: true,
        health: 180,
        speedX: 0,
        speedY: 0.4,
        acceleration: 0,
        img: game.assets.getImage('asteroid-8'),
        x: 0,
        y: 0,
        sx: 0,
        sy: 0,
        width: game.assets.getImage('asteroid-8').width,
        height: game.assets.getImage('asteroid-8').height,
        hitbox: [
            {
                x: 13,
                y: 11,
                width: 55,
                height: 51
            }
        ],
    };

    this.currentLevel = 0;

    this.getCurrentLevel = function () {
        return self.currentLevel === 0 ? '-' : self.currentLevel;
    };

    this.init = function () {
        game.texts.addLevelCounter(this.getCurrentLevel);
    };

    this.start = function () {
        if (!inited) {
            inited = true;
            this.init();
        }

        if (type === 'challange') {
            var scenario = new Challange(game, this);
            scenario.init();
            scenario.start();
        } else {
            this.nextScenario();
        }
    };

    this.nextScenario = function (config) {
        try {
            usedSpaces = [];
            if (!config) {
                config = {};
            }
            config['fighter '] = this.fighter;
            this.currentScenario++;
            this.scenarios[this.currentScenario] = new this.scenarios[this.currentScenario](game, this, config);
            this.scenarios[this.currentScenario].init();
            this.scenarios[this.currentScenario].start();
        } catch (e) {
            console.log(e)
        }

    };

    this.setFighter = function (fighter) {
        this.fighter = fighter;
    };

    this.addLevelEnemies = function () {
        var canvasWidth = game.getCanvasWidth();
        var canvasHeight = game.getCanvasHeight();
        var canvasWidthCenter = game.getCanvasWidthCenter();
        var canvasHeightCenter = game.getCanvasHeightCenter();

        /**
         *  {
                enemy : 'size4',
                x : 0.12,
                y : 0.05
            },
         * @type Array
         */
        var config = [
            //            {
            //                enemy : 'size4',
            //                x : 0,
            //                y : 0.05
            //            },
        ];

        var populate = [
            {
                size1: 5,
                size4: 10,
                size5: 5,
                size8: 3
            }
        ];

        //            var enemy = new Asteroid(game, self, types[config[0].enemy]);
        //            enemy.x = 200;
        //            enemy.y = 200;
        //            
        //            
        //            game.addObject(enemy);
        //        
        //            var enemy = new Asteroid(game, self, types['size5']);
        //            enemy.x = 180;
        //            enemy.y = 255;
        //            enemy.speedY = 0.1;
        //            
        //            game.addObject(enemy);


        //        var turret = new Turret(game, fighter);
        //        console.log(canvasWidth, canvasWidth - turret.width)
        //        turret.x = canvasWidth - turret.width + 18;
        //        turret.y = canvasHeightCenter - turret.height / 2 + 18;
        //        game.addObject(turret);
        //        
        //        console.log(turret)
        //        currentEnemies++;
        //        return;
        //
        //        var enemy = new Enemy(game, types['enemy-1']);
        //        enemy.x = canvasWidth * 0.1 + types['enemy-1'].width;
        //        enemy.y = 0 - types['enemy-1'].height;
        //        game.addObject(enemy);
        //
        //        var enemy = new Enemy(game, types['enemy-1']);
        //        enemy.x = canvasWidth * 0.9 - types['enemy-1'].width;
        //        enemy.y = 0 - types['enemy-1'].height;
        //        game.addObject(enemy);





        //        var boss = new Boss(game);
        //        game.addObject(boss);
        //        
        //        for (var p in populate) {
        //            for (var t in populate[p]) {
        //                for (var i = 1; i <= populate[p][t]; i++) {
        //                    config.push(self.getFreePosition({
        //                        enemy : t,
        //                        x : (Math.random() * 0.9  / 2 + Math.random() * 0.9 / 2) * canvasWidth,
        //                        y : -((Math.random() * 2 + 0.1) / 2 + (Math.random() * 2 + 0.1) / 2) * canvasHeight,
        //                        width : types[t].width,
        //                        height : types[t].height
        //                    }));
        //                }
        //            }
        //        }
        //        
        //        for (var i in config) {
        //
        //            var enemy = new Asteroid(game, self, types[config[i].enemy]);
        //            enemy.x = config[i].x;
        //            enemy.y = config[i].y;
        //            
        //            game.addObject(enemy);
        //            
        //            currentEnemies++;
        //        }   
    };

    this.getFreePosition = function (object) {
        if (usedSpaces.length === 0) {
            usedSpaces.push(object);
            return object;
        }

        object.x += 15;
        object.y += 15;
        object.width += 15;
        object.height += 15;

        for (var i in usedSpaces) {
            if (game.willCollision(object, usedSpaces[i])) {
                object.x += 1;
                return this.getFreePosition(object);
            } else {
                usedSpaces.push(object);
                object.x -= 15;
                object.y -= 15;
                object.width -= 15;
                object.height -= 15;
                return object;
            }
        }
    };

    this.enemyDestroy = function (enemy, killed) {
        game.points += enemy.points;
        this.killedEnemies++;
        if (this.killedEnemies >= this.currentEnemies && this.currentEnemies > 0 && type !== 'challange') {
            usedSpaces = [];
            this.scenarios[this.currentScenario].finish();
            //this.scenarios[this.currentScenario].active = false;
        }
    };
}

