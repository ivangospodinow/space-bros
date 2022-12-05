import CanvasObject from '../Abstract/CanvasObject';

export default function Menu(game) {
    Object.customAssignObject(this, new CanvasObject);
    this.setCollisions(false);

    this.objectName = 'Menu';

    this.x = 0;

    var activeMenu = 0;
    var gameStarted = false;

    var parts = {
        title: true,
        menu: true,
        credits: false,
    };

    var background;
    var objects = game.getObjects();
    for (var i in objects) {
        if (objects[i].objectName === 'Background') {
            background = objects[i];
        }
    }
    background.fastFoward = 0.2;

    this.draw = function (ctx) {
        if (game.gameover) {
            activeMenu = 0;

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('New Game', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('->', game.getCanvasWidth() / 2 - 100, game.getCanvasHeight() * 0.4);
        }

        if (gameStarted) {
            return;
        }
        //        /**
        //         * @TODO
        //         */
        //                gameStarted = true;
        //                game.startGame(true);
        if (parts.title) {

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold " + game.getFontSize(50) + "px Orbitron";
            ctx.fillText('Space Bros', game.getCanvasWidth() / 2 - game.getFontSize(50) * 4.5, game.getCanvasHeight() * 0.1);
        }

        if (parts.menu) {
            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold " + game.getFontSize(25) + "px Orbitron";
            ctx.fillText('New Game', game.getCanvasWidth() / 2 - game.getFontSize(25) * 2.5, game.getCanvasHeight() * 0.4);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('Challenge', game.getCanvasWidth() / 2 - 45, game.getCanvasHeight() * 0.4 + 40);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('Credits', game.getCanvasWidth() / 2 - 30, game.getCanvasHeight() * 0.4 + 80);



            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('->', game.getCanvasWidth() / 2 - 100, game.getCanvasHeight() * 0.4 + (40 * activeMenu));



            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 12px Arial";
            ctx.fillText('v 0.10', 5, game.getCanvasHeight() - 5);
        }

        if (parts.credits) {
            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('Return', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('->', game.getCanvasWidth() / 2 - 100, game.getCanvasHeight() * 0.4);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('Developer', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 40);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    Ivan Gospodinow', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 60);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    ivangospodinow.com', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 80);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    ivangospodinow@gmail.com', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 100);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('Design', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 140);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    tatermand', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 160);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    opengameart.org/users/tatermand', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 180);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 14px Arial";
            ctx.fillText('    tatermand@gmail.com', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 200);

            ctx.fillStyle = "#faf3c2";
            ctx.font = "bold 20px Orbitron";
            ctx.fillText('2016', game.getCanvasWidth() / 2 - 50, game.getCanvasHeight() * 0.4 + 240);
        }

    };

    game.onkeydown(function (e) {
        if (e.keyCode === 40) {
            if (parts.menu && activeMenu + 1 < 3) {
                activeMenu++;
            }
        }

        if (e.keyCode === 38) {
            if (parts.menu && activeMenu - 1 >= 0) {
                activeMenu--;
            }
        }

        if (e.keyCode === 13) {
            if (activeMenu === 0 && (!gameStarted || game.gameover)) {
                gameStarted = true;
                game.startGame(true);
                if (game.gameover) {
                    window.location.reload();
                }
            } else if (activeMenu === 1) {
                gameStarted = true;
                game.startGameChallange(true);
                if (game.gameover) {
                    window.location.reload();
                }
            } else if (activeMenu === 2) {
                if (parts.credits) {
                    for (var i in parts) {
                        parts[i] = false;
                    }
                    parts.title = true;
                    parts.menu = true;
                } else {
                    for (var i in parts) {
                        parts[i] = false;
                    }
                    parts.title = true;
                    parts.credits = true;
                }
            }
        }
    });

    game.addObject(this);
}