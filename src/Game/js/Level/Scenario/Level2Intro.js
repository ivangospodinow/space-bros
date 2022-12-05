import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import CanvasObjectShape from '../../Abstract/CanvasObjectShape';

export default function Level2Intro(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);
    this.disable = true;
    this.nextLevelStarted = false;
    var counter = 0;

    var background;
    var objects = game.getObjects();
    for (var i in objects) {
        if (objects[i].objectName === 'Background') {
            background = objects[i];
            break;
        }
    }

    background.fastFoward = 5;

    var level2Background = new CanvasObjectShape;
    //    level2Background.disable = true;
    level2Background.width = game.assets.getImage('background-red-giant').width;
    level2Background.height = game.assets.getImage('background-red-giant').height;
    level2Background.shapes = [
        {
            active: true,
            img: game.assets.getImage('background-red-giant'),
            x: 0,
            y: 0,
            sx: 0,
            sy: 0,
            width: level2Background.width,
            height: level2Background.height,
            hitbox: [],
        }
    ];
    level2Background.y = -level2Background.height;

    game.addObject(level2Background);

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
        if (background.fastFoward > 0) {
            background.fastFoward -= 0.05;
        }

        if (level2Background.y <= 0) {
            level2Background.y += 5;
        }

        if (level2Background.y >= 0) {
            background.fastFoward = 0;
        }

        if (background.fastFoward <= 2) {
            level2Background.disable = false;
        }

        if (background.fastFoward <= 0) {
            background.fastFoward = 0;
            level.fighter.controls = true;
            if (!this.nextLevelStarted) {
                this.nextLevelStarted = true;
                level.nextScenario({ level2Background: level2Background });
                this.active = false;
            }
        }

        counter++;
    };

    game.addObject(this);
}
