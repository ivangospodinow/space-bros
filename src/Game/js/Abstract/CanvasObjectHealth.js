export default function CanvasObjectHealth() {
    this.health = 0;
    this.damageDone = 0;

    this.damage = function (source, targets) {
        for (var i in targets) {

            if (source.health === targets[i].health) {
                source.damageDone = source.health;
                source.health = 0;
                source.setActive(false);
                source.takeDamage(targets[i]);

                targets[i].health = 0;
                targets[i].setActive(false);
                targets[i].takeDamage(source);
                return;
            } else if (source.health > targets[i].health) {
                source.damageDone = targets[i].health;
                source.health -= targets[i].health;
                source.takeDamage(targets[i]);

                targets[i].health = 0;
                targets[i].setActive(false);
                targets[i].takeDamage(source);
            } else {
                targets[i].health -= source.health;
                targets[i].takeDamage(source);

                source.damageDone = source.health;
                source.setActive(false);
                source.health = 0;
                source.takeDamage(targets[i]);
                return;
            }
        }
    };

    this.takeDamage = function (object) {

    };
}

