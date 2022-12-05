import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import BossFinal from '../../Object/BossFinal';
import Turret from '../../Object/Turret';

export default function Level3(game, level, config) {
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

    background.fastFoward = background.fastFoward = background.fastForwardSpeed;;

    var boss = new BossFinal(game);
    boss.disable = false;
    boss.x = game.getCanvasWidth() / 2 - boss.width / 2;
    boss.y = 5;


    //    
    var turret = new Turret(game, level.fighter, {
        img: game.assets.getImage('final-boss-turret'),
        bulletWidth: 5,
        bulletHeight: 30,
        bulletSpeed: 1,
        bulletStep: 0.2,
        bulletShowAfter: 5,
    }
    );
    turret.x = boss.getCenterX() - turret.width / 2;
    turret.y = boss.y + 10;;
    game.addObject(turret);
    boss.turret = turret;
    game.addObject(boss);

    this.init = function () {
        level.currentLevel = 3;

        this.disable = false;
        level.fighter.disable = false
        level.fighter.controls = true;
    };

    this.start = function () {

    };

    this.finish = function () {

    };

    this.ctx = function (ctx) {
        turret.x = boss.getCenterX() - turret.width / 2;
        turret.y = boss.y + 10;

        if (!boss.active) {
            this.nextLevelStarted = true;
            level.nextScenario();
            this.active = false;
        }
    };

    game.addObject(this);
}
