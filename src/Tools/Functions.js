import { APP_BASE_PATH } from "../Config";


export function imagePath(src) {
    if (undefined !== src['default']) {
        src = src['default'];
    }
    if (String(src).substr(0, 10) === 'data:image') {
        return src;
    }
    return APP_BASE_PATH + '.' + src;
}