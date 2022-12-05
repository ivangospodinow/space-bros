import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import Enemy from '../../Object/Enemy';
import Boss from '../../Object/Boss';
import Turret from '../../Object/Turret';


export default function Level2(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);
    this.disable = true;
    this.nextLevelStarted = false;
    this.stage1Done = false;
    this.stage2Done = false;
    this.stage3Done = false;

    var counter = 0;

    var turret1 = new Turret(game, level.fighter, {});
    turret1.x = game.getCanvasWidth();
    turret1.y = game.getCanvasHeight() / 2 - turret1.height / 2;
    turret1.fire = false;
    game.addObject(turret1);

    var turret2 = new Turret(game, level.fighter, {});
    turret2.x = -turret1.width;
    turret2.y = game.getCanvasHeight() / 2 - turret2.height / 2;
    turret2.fire = false;
    game.addObject(turret2);

    this.init = function () {
        level.currentLevel = 2;

        this.disable = false;
        level.fighter.disable = false;
        level.fighter.controls = true;

        this.stage1();

        game.addObject(this);
    };

    this.start = function () {

    };

    this.finish = function () {

    };

    this.ctx = function (ctx) {
        if (counter >= 120) {
            if (turret1.x >= game.getCanvasWidth() - turret1.width) {
                turret1.x -= 1;
            } else {
                turret1.fire = true;
            }
        }

        if (counter >= 265) {
            if (turret2.x <= 0) {
                turret2.x += 1;
            } else {
                turret2.fire = true;
            }
        }

        if (level.killedEnemies >= level.currentEnemies) {
            if (this.stage1Done && !this.stage2Done) {
                this.stage2();
            } else if (this.stage2Done && !this.stage3Done) {
                this.stage3();
            } else if (this.stage3Done && !this.nextLevelStarted) {
                this.nextLevelStarted = true;
                level.nextScenario({ turret1: turret1, turret2: turret2, level2Background: config.level2Background });
                this.active = false;
            }
        }
        counter++;
    };

    this.stage1 = function () {
        this.stage1Done = true;
        var interval = (level.types['enemy-1'].width + game.getCanvasWidth() * 0.02);
        var sign = [-1, 1];

        for (var s in sign) {
            for (var i = 0; i <= 1; i++) {
                var enemy = new Enemy(game, level, level.types['enemy-1']);
                enemy.x = (game.getCanvasWidth() / 2 - (enemy.width / 2)) + (interval * i * sign[s]);
                enemy.y = 0 - level.types['enemy-1'].height;
                enemy.delayShoot = (i + 1) * 5;
                game.addObject(enemy);
                level.currentEnemies++;
            }
        }
    };

    this.stage2 = function () {
        this.stage2Done = true;

        var interval = (level.types['enemy-1'].width + game.getCanvasWidth() * 0.02);
        var sign = [-1, 1];

        for (var s in sign) {
            for (var i = 0; i <= 1; i++) {
                var enemy = new Enemy(game, level, level.types['enemy-1']);
                enemy.x = (game.getCanvasWidth() / 2 - (enemy.width / 2)) + (interval * i * sign[s]);
                enemy.y = 0 - level.types['enemy-1'].height;
                enemy.delayShoot = (i + 1) * 5;
                game.addObject(enemy);
                level.currentEnemies++;
            }
        }
    };

    this.stage3 = function () {
        this.stage3Done = true;
        game.addObject(new Boss(game, level));
        level.currentEnemies++;
    };
}
