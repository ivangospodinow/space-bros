import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import BossAsteroid from '../../Object/BossAsteroid';
import Asteroid from '../../Object/Asteroid';


export default function Level1(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);
    this.disable = true;
    this.bossAdded = false;
    this.nextLevelCounter = 0;
    this.nextLevelAdded = 0;
    var wave = 1;


    this.init = function () {
        level.currentLevel = 1;

        this.disable = false;
        game.addObject(this);
        level.fighter.disable = false;
        level.fighter.controls = true;
        level.fighter.canLevel = true;

        this.addEnemies([
            {
                size1: 3,
                size4: 4,
                size5: 5,
                size8: 3
            }
        ], game.getCanvasHeight() / 2);
    };

    this.start = function () {

    };

    this.finish = function () {

    };

    this.ctx = function (ctx) {
        if (level.currentEnemies - level.killedEnemies <= 10 && wave <= 3) {
            wave++;
            this.addEnemies([
                {
                    size1: 5,
                    size4: 10,
                    size5: 5,
                    size8: 3
                }
            ], - 50);
        }

        if (level.currentEnemies - level.killedEnemies === 0 && wave >= 3 && !this.bossAdded) {
            this.bossAdded = true;
            var boss = new BossAsteroid(game, level);
            game.addObject(boss);
            level.currentEnemies++;
        }

        if (level.currentEnemies - level.killedEnemies === 0 && wave >= 3 && this.bossAdded) {
            if (this.nextLevelCounter >= 240 && !this.nextLevelAdded) {
                this.nextLevelAdded = true;
                level.nextScenario();
                this.active = false;
            }
            this.nextLevelCounter++;
        }
    };

    this.addEnemies = function (populate, startHeight) {
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
}

