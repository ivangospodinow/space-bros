export default function CanvasObject() {
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.active = true;
    this.collisions = true;
    this.activeCollision = false;
    this.ctx = [];
    this.type = 'object';
    this.destroyed = false;
    this.hitbox = [];
    this.zIndex = 100;
    this.disable = false;
    this.tmp = false;

    /**
     * {x,y,width,height}
     * @param {type} hitbox
     * @returns {undefined}
     */
    this.setHitbox = function (hitbox) {
        this.hitbox = hitbox;
    };

    this.getHitbox = function () {
        return this.hitbox;
    }

    this.isDestroyed = function () {
        return this.destroyed;
    };

    this.setDestroyed = function (bool) {
        this.destroyed = bool;
    };

    this.collision = function (object) { };
    this.getType = function () {
        return this.type;
    };
    this.canCollision = function (object) {
        return this.collisions;
    };
    this.canActiveCollision = function () {
        return this.activeCollision;
    };
    this.setCollisions = function (bool) {
        this.collisions = bool;
    };
    this.isActive = function () {
        return this.active;
    };
    this.setActive = function (bool) {
        this.active = bool;
    };

    this.setActiveFalse = function () {
        this.active = false;
    };

    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
    this.setX = function (x) {
        this.x = x;
    };
    this.setY = function (y) {
        this.y = y;
    };
    this.getWidth = function () {
        return this.width;
    };
    this.getHeight = function () {
        return this.height;
    };
    this.destroy = function () {
        return []
    };

    this.draw = function (ctx) {
        if (this.disable) {
            return;
        }

        ctx.beginPath();
        if (undefined !== this.ctx) {
            this.ctx(ctx);
        }
        ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        ctx.stroke();
    };

    this.getCenterX = function () {
        return this.x + this.width / 2;
    };

    this.getCenterY = function () {
        return this.y + this.height / 2;
    };

    this.ctx = function (ctx) {

    };
}

