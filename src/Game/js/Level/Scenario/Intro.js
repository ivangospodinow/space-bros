import ScenarioObject from '../../Abstract/ScenarioObject';
import CanvasObject from '../../Abstract/CanvasObject';
import Fighter from '../../Object/Fighter';
import BossFinalIntro from '../../Object/BossFinalIntro';
import Bullet from '../../Object/Bullet';

import BulletAngle from '../../Object/BulletAngle';
import BulletImpact from '../../Object/BulletImpact';

export default function Intro(game, level, config) {
    Object.customAssignObject(this, new ScenarioObject);
    Object.customAssignObject(this, new CanvasObject);
    //    this.zIndex = 9999;
    this.disable = true;

    this.init = function () {
        this.disable = false;
    };

    var objects = game.getObjects();
    var background;
    var disabled = [];
    for (var i in objects) {
        if (objects[i].objectName === 'Background') {
            background = objects[i];
        } else {
            objects[i].disable = true;
            disabled.push(objects[i]);
        }
    }

    var counter = 0;

    background.fastFoward = background.fastForwardSpeed;

    var f1 = level.fighter;
    f1.shapes.thrust.active = true;
    f1.disable = true;
    f1.controls = false;
    f1.canLevel = false;
    f1.x = game.getCanvasWidthCenter() - f1.width * 1.5;
    f1.y = game.getCanvasHeight() + f1.height;

    var f2 = new Fighter(game, {
        controls: false,
        canLevel: false,
    });
    f2.shapes.thrust.active = true;
    f2.disable = 1;
    f2.x = game.getCanvasWidthCenter() + f2.width * 0.5;
    f2.y = game.getCanvasHeight() + f2.height;
    f2.type = 'fighter-2';


    var finalBoss = new BossFinalIntro(game);
    finalBoss.disable = false;
    finalBoss.x = game.getCanvasWidthCenter() - finalBoss.width / 2;
    finalBoss.y = game.getCanvasHeight() + finalBoss.height;


    for (var i in finalBoss.shapes) {
        finalBoss.shapes[i].active = false;
    }

    finalBoss.shapes['ship'].active = true;
    finalBoss.shapes['thrust'].active = true;
    var bossOutSpeedIncrement = 0;

    var bossInPosition = false;
    var bullet = null;
    var f2DestroyedCounter = 0;



    this.start = function () {
        game.addObject(f2);
        game.addObject(finalBoss);
        game.addObject(this);
    };

    this.ctx = function (ctx) {
        if (counter === 1) {
            f1.disable = false;
            f1.y -= 1;
            f2.disable = false;
            f2.y -= 1;
        }

        if (counter >= 1 && counter <= 250) {
            f1.y -= 1;
            f2.y -= 1;
        }

        if (counter <= 250) {
            var text = 'Somewhere in our Galaxy';
            ctx.fillStyle = '#faf3c2';
            ctx.font = '20px Orbitron';
            ctx.fillText(
                text,
                game.getCanvasWidthCenter() - (text.length / 2) * 12,
                game.getCanvasHeightCenter() - 20
            );
        } else if (counter >= 300 && counter <= 800) {
            ctx.fillStyle = '#faf3c2';
            ctx.font = '20px Orbitron';
            ctx.fillText(
                'f1: What a disaster,',
                20,
                game.getCanvasHeight() - 50
            );

            ctx.fillStyle = '#faf3c2';
            ctx.font = '20px Orbitron';
            ctx.fillText(
                '     I regret getting this job...',
                20,
                game.getCanvasHeight() - 20
            );

        } else if (counter >= 800 && counter <= 1400) {
            ctx.fillStyle = '#faf3c2';
            ctx.font = '19px Orbitron';
            ctx.fillText(
                'f2: We need this last one before...',
                20,
                game.getCanvasHeight() - 50
            );

            ctx.fillStyle = '#faf3c2';
            ctx.font = '19px Orbitron';
            ctx.fillText(
                '      Wait a minute... What is that ?',
                20,
                game.getCanvasHeight() - 20
            );

        } else if (counter >= 1400) {
            finalBoss.disable = false;
            if (finalBoss.y > 0 + finalBoss.height) {
                finalBoss.y -= game.getCanvasHeight() * 0.01;
            } else {
                bossInPosition = true;
            }
            console.log(bossInPosition)
        }
        if (bossInPosition && !bullet) {
            bullet = new BulletAngle(game, {
                x: finalBoss.getCenterX(),
                y: finalBoss.getCenterY(),
                tx: f2.getCenterX(),
                ty: f2.y,
                width: 6,
                height: 12,
                step: 0.5,
                speed: 0.1,
                heightAdd: 1,
                health: [100],
                collisionType: 'fighter-2',
                type: 'enemy-bullet',
            });
            bullet.destroy = function () {
                game.addObject(new BulletImpact(game, bullet, { width: f2.width / 2 }));
                f2DestroyedCounter = counter + 30;
            };
            game.addObject(bullet);
            console.log(bullet)
        }



        if (f2DestroyedCounter && counter >= f2DestroyedCounter && counter <= f2DestroyedCounter + 400) {
            var text = 'f1:Noooooo! You bastard!';
            ctx.fillStyle = '#faf3c2';
            ctx.font = '20px Orbitron';
            ctx.fillText(
                text,
                20,
                game.getCanvasHeight() - 20
            );
        }

        if (f2DestroyedCounter) {
            if ((counter >= f2DestroyedCounter && counter <= f2DestroyedCounter + 60 * 1)
                || (counter >= f2DestroyedCounter + 60 * 2 && counter <= f2DestroyedCounter + 60 * 3)
                || (counter >= f2DestroyedCounter + 60 * 4 && counter <= f2DestroyedCounter + 60 * 5)
                || (counter >= f2DestroyedCounter + 60 * 6 && counter <= f2DestroyedCounter + 60 * 7)
                || (counter >= f2DestroyedCounter + 60 * 8 && counter <= f2DestroyedCounter + 60 * 9)) {
                var text = 'Warning, warp unstable!';
                ctx.fillStyle = '#FF5600';
                ctx.font = '20px Orbitron';
                ctx.fillText(
                    text,
                    game.getCanvasWidthCenter() - (text.length / 2) * 12,
                    40
                );
            }


        }


        if (f2DestroyedCounter && counter >= f2DestroyedCounter + 30) {
            background.fastFoward -= 0.05;
            if (background.fastFoward <= 0) {
                background.fastFoward = 0;
                this.finish();
            }
            if (background.fastFoward <= 0) {
                background.fastFoward = 0;
            }

            finalBoss.y -= 5 + bossOutSpeedIncrement;
            bossOutSpeedIncrement += 0.2;
        }

        counter++;
    };

    this.finish = function () {
        // console.log('Intro.finish');
        f2.active = false;
        finalBoss.active = false;
        this.active = false;
        for (var i in disabled) {
            disabled[i].disable = false;
        }
        this.active = false;

        level.fighter = f1;
        level.nextScenario();
    };
}
