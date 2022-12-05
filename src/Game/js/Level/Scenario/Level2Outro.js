import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';

export default function Level2Outro(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);
    this.disable = true;
    this.nextLevelStarted = false;
    var counter = 0;

    var background;
    var objects = game.getObjects();
    var turrets = [];
    for (var i in objects) {
        if (objects[i].objectName === 'Background' && config['level2Background'] !== objects[i]) {
            background = objects[i];
        } else if (objects[i].objectName === 'Turret') {
            objects[i].active = false
        }
    }


    this.init = function () {
        this.disable = false;
        level.fighter.disable = false;
        level.fighter.controls = false;
    };

    this.start = function () {

    };

    this.finish = function () {

    };

    this.ctx = function (ctx) {
        level.fighter.shapes['thrust'].active = true;
        background.fastFoward += 0.1;
        if (background.fastFoward >= background.fastForwardSpeed) {
            background.fastFoward = background.fastForwardSpeed;
        }
        if (config['level2Background']) {
            config['level2Background'].active = false;
        }


        if (counter >= 120) {
            if (undefined !== config.turret1) {
                config.turret1.active = false;
            }

            if (undefined !== config.turret2) {
                config.turret2.active = false;
            }
            if (counter <= 480) {
                var text = 'Warp engine online';
                ctx.fillStyle = '#faf3c2';
                ctx.font = '20px Orbitron';
                ctx.fillText(
                    text,
                    game.getCanvasWidthCenter() - (text.length / 2) * 12,
                    40
                );
            }
        }

        if (counter >= 1000 && !this.nextLevelStarted) {
            this.nextLevelStarted = true;
            level.nextScenario();
            this.active = false;
        }

        counter++;
    };

    game.addObject(this);
}
