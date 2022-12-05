export default function Assets() {
    var self = this;
    var data = {};
    var loaded = 0;
    var count = 0;

    this.addImage = function (name, src) {
        data[name] = src;
        count++;
    };

    this.getImage = function (name) {
        return data[name];
    };

    this.load = function (callback) {
        for (var i in data) {
            var img = new Image();
            img.onload = function () {
                loaded++;
                if (loaded >= count) {
                    callback.apply(self);
                }
            };
            img.src = data[i];
            data[i] = img;
        }
    };
}
