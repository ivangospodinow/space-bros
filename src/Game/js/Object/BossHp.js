import CanvasObject from '../Abstract/CanvasObject';

export default function BossHp(game, boss) {
    Object.customAssignObject(this, new CanvasObject);
    this.setCollisions(false);

    this.objectName = 'BossHp';

    this.width = boss.width;
    this.height = 2;
    this.x = 0;
    this.y = 0;
    this.tmp = true;
    var health = boss.health;

    // game.points
    this.ctx = function (ctx) {
        this.x = boss.x;
        this.y = boss.y - 5;
        this.width = (boss.health / health) * boss.width;
        ctx.fillStyle = 'green';
    };
}
