import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import Asteroid from '../../Object/Asteroid';

export default function Challange(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);


    var objects = game.getObjects();
    var background;
    for (var i in objects) {
        if (objects[i].objectName === 'Background') {
            background = objects[i];
        }
    }
    console.log(background)
    level.fighter.disable = false;
    level.fighter.controls = true;
    level.fighter.canLevel = true;

    this.wave = 0;

    this.init = function () {

    };

    this.start = function () {

    };

    this.finish = function () {

    };

    this.ctx = function (ctx) {

        background.fastFoward += 0.1;
        if (background.fastFoward >= background.fastForwardSpeed) {
            background.fastFoward = background.fastForwardSpeed;
        }

        if (level.killedEnemies >= level.currentEnemies) {
            this.nextWave();
        }
    };

    this.nextWave = function () {
        this.wave++;

        this.addAsteroid([
            {
                size1: this.getRandomArbitrary(5, 10),
                size4: this.getRandomArbitrary(10, 15),
                size5: this.getRandomArbitrary(5, 10),
                size8: this.getRandomArbitrary(3, 6)
            }
        ], 0);
    };

    this.addAsteroid = function (populate, startHeight) {
        var enemies = [];
        for (var p in populate) {
            for (var t in populate[p]) {
                for (var i = 1; i <= populate[p][t]; i++) {
                    enemies.push(level.getFreePosition({
                        enemy: t,
                        x: (Math.random() * 0.9 / 2 + Math.random() * 0.9 / 2) * game.getCanvasWidth(),
                        y: startHeight - ((Math.random() * 2 + 0.1) / 2 + (Math.random() * 2 + 0.1) / 2) * game.getCanvasHeight(),
                        width: level.types[t].width + game.getCanvasWidth() * 0.05,
                        height: level.types[t].height + game.getCanvasHeight() * 0.05
                    }));
                }
            }
        }


        for (var i in enemies) {

            var enemy = new Asteroid(game, level, level.types[enemies[i].enemy]);
            enemy.x = enemies[i].x;
            enemy.y = enemies[i].y;

            game.addObject(enemy);

            level.currentEnemies++;
        }
    };

    this.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    game.addObject(this);
}

