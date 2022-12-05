import CanvasObjectHealth from '../Abstract/CanvasObjectHealth';
import CanvasObjectPoints from '../Abstract/CanvasObjectPoints';
import CanvasObjectShape from '../Abstract/CanvasObjectShape';
import BossFinal from './BossFinal';

export default function BossFinalIntro(game) {
    Object.customAssignObject(this, new CanvasObjectHealth());
    Object.customAssignObject(this, new CanvasObjectPoints());
    Object.customAssignObject(
        this,
        new CanvasObjectShape(
            {
                'ship': {
                    active: true,
                    img: game.assets.getImage('final-boss-intro'),
                    x: 0,
                    y: 0,
                    sx: 0,
                    sy: 0,
                    width: 182,
                    height: 167,
                    hitbox: [
                        {
                            x: 0,
                            y: 0,
                            width: 182,
                            height: 167
                        }
                    ],
                },
                'thrust': {
                    active: false,
                    img: game.assets.getImage('final-boss-intro'),
                    x: 77,
                    y: 152,
                    sx: 75,
                    sy: 187,
                    width: 58,
                    height: 200,
                    hitbox: [],
                },
            }
        )
    );

    this.objectName = 'BossFinalIntro';

    var self = this;

    this.width = 182;
    this.height = 167;

    var boss = new BossFinal(game);

    this.bulletWidth = boss.bulletWidth;
    this.bulletHeight = boss.bulletHeight;
    this.bulletStep = boss.bulletStep;
    this.bulletSpeed = boss.bulletSpeed;
    this.bulletHeightAdd = boss.bulletHeightAdd;

    this.refreshHitbox();
}
