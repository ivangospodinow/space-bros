import CanvasObject from '../Abstract/CanvasObject';

export default function FighterLevel(game, fighter) {
    Object.customAssignObject(this, new CanvasObject);
    this.setCollisions(false);

    this.objectName = 'FighterLevel';

    var width = game.getCanvasWidth() * 0.1;

    this.width = 0;
    this.height = 5;
    this.x = game.getCanvasWidth() - width;
    this.y = game.getCanvasHeight() - this.height;

    this.points = fighter.levels[fighter.level].points;
    this.nextLevelPoints = undefined !== fighter.levels[fighter.level + 1] ? fighter.levels[fighter.level + 1].points : null;

    // game.points
    this.ctx = function (ctx) {
        this.nextLevelPoints = undefined !== fighter.levels[fighter.level + 1] ? fighter.levels[fighter.level + 1].points : null;

        if (this.nextLevelPoints === null) {
            this.width = width;
        } else {
            this.width = (game.points / this.nextLevelPoints) * width;
        }

        ctx.fillStyle = 'green';
    };
}
