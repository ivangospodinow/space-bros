export default function Texts(game, text) {
    var self = this;

    this.collisions = false;
    this.disable = function (bool) {
        text.disable = bool;
    };


    this.getFps = function () {
        return game.fps;
    };

    this.getFps = function () {
        return game.fps;
    };

    this.getPoints = function () {
        return game.points === 0 ? '-' : game.points;
    };

    this.getEnemies = function () {
        return game.enemies === 0 ? '-' : game.enemies;
    };

    this.getNumberOfObjects = function () {
        return game.getObjects().length;
    };



    text.add('fpsNumber', {
        fillStyle: '#faf3c2',
        font: 'bold 20px Orbitron',
        fillText: [this.getFps, 5, 20]
    });

    text.add('fpsText', {
        fillStyle: '#faf3c2',
        font: '10px Arial',
        fillText: ['fps', 40, 12]
    });

    text.add('objectsNumber', {
        fillStyle: '#faf3c2',
        font: 'bold 20px Orbitron',
        fillText: [this.getNumberOfObjects, 5, 40]
    });

    text.add('objectsText', {
        fillStyle: '#faf3c2',
        font: '10px Arial',
        fillText: ['obj', 40, 32]
    });

    text.add('buttletsNumber', {
        fillStyle: '#faf3c2',
        font: 'bold 20px Orbitron',
        fillText: [this.getPoints, 5, game.getCanvasHeight() - 17]
    });

    text.add('buttletsText', {
        fillStyle: '#faf3c2',
        font: '10px Arial',
        fillText: ['points', 5, game.getCanvasHeight() - 6]
    });

    text.add('enemiesNumber', {
        fillStyle: '#faf3c2',
        font: 'bold 20px Orbitron',
        fillText: [this.getEnemies, 5, game.getCanvasHeight() - 48]
    });

    text.add('enemiesText', {
        fillStyle: '#faf3c2',
        font: '10px Arial',
        fillText: ['kills', 5, game.getCanvasHeight() - 40]
    });

    this.addDamageText = function (object) {
        var id = new Date().getTime();
        text.add(id, {
            fillStyle: '#50ff28',
            font: 'bold 10px Orbitron',
            fillText: [parseInt(object.damageDone), object.x + (object.width / 2), object.y - (object.height / 2)],
            removeAfter: 10,
        });
    };

    this.addLevelStart = function (level) {
        text.add('levelStartNum', {
            fillStyle: '#faf3c2',
            font: '50px Helvetica',
            fillText: ['Level ' + level, game.getCanvasWidthCenter() - 70, game.getCanvasHeightCenter() - 30],
            removeAfter: 200,
        });
    };

    this.addLevelCounter = function (calblack) {
        text.add('levelNumber', {
            fillStyle: '#faf3c2',
            font: 'bold 20px Orbitron',
            fillText: [calblack, 5, game.getCanvasHeight() - 82]
        });

        text.add('levelText', {
            fillStyle: '#faf3c2',
            font: '10px Arial',
            fillText: ['level', 5, game.getCanvasHeight() - 68]
        });
    };
}
