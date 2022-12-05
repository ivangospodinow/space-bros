import CanvasObject from '../Abstract/CanvasObject';

export default function Text(game) {
    Object.customAssignObject(this, new CanvasObject);
    this.setCollisions(false);

    this.objectName = 'Text';

    var texts = {};
    this.zIndex = 2000;

    this.add = function (name, text) {
        if (undefined === text.removeAfter) {
            text.removeAfter = null;
        }
        texts[name] = text;
    };

    this.remove = function (name) {
        var ob = {};
        for (var i in texts) {
            if (i !== name) {
                ob[i] = texts[i];
            }
        }
        texts = ob;
        ob = undefined;
    };

    this.draw = function (ctx) {
        if (this.disable) {
            return;
        }

        for (var i in texts) {
            ctx.fillStyle = texts[i].fillStyle;
            ctx.font = texts[i].font;
            ctx.fillText(
                (typeof texts[i].fillText[0] === 'function' ? texts[i].fillText[0].apply(this, ctx) : texts[i].fillText[0]),
                texts[i].fillText[1],
                texts[i].fillText[2]
            );
            if (texts[i].removeAfter !== null) {
                texts[i].removeAfter -= 1;
                if (texts[i].removeAfter <= 0) {
                    this.remove(i);
                }
            }
        }
    };

    game.addObject(this);
}