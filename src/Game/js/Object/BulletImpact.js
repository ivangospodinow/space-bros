import CanvasObject from '../Abstract/CanvasObject';


export default function BulletImpact(game, bullet, config) {
    Object.customAssignObject(this, new CanvasObject);
    config = config ? config : {};

    this.objectName = 'BulletImpact';

    this.x = bullet.x + bullet.width / 2;
    this.y = bullet.y;
    this.width = config['width'] || bullet.width;
    this.color = bullet.color;
    this.step = bullet.step;
    this.zIndex = 1000;
    this.tmp = true;
    // console.log(this.width)
    var count = 10;
    var radius = this.width;

    this.draw = function (ctx) {
        if (count <= 0) {
            this.active = false;
            return;
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        count--;
        radius += 0.8;
        this.y -= 1;
    };
}
