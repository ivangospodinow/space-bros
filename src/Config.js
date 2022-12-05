export const APP_VERSION = '0.10';
export const APP_STORE = {};

var url = window.location.href.replace('/index.html', '').split('?')[0];
if (url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1);
}
url += '/';
url = url.split('#')[0];
if (url.substr(-1) !== '/') {
    url = url + '/';
}

console.log(url);


export const APP_BASE_PATH = url;

export const APP_WIDTH = document.body.clientWidth;
export const APP_HEIGHT = document.body.clientHeight;

export const GAME_ASSETS = [
    { name: 'ships', src: 'assets/ships.png' },
    { name: 'enemies', src: 'assets/enemies.png' },
    { name: 'asteroid-1', src: 'assets/asteroid-1.png' },
    { name: 'asteroid-4', src: 'assets/asteroid-4.png' },
    { name: 'asteroid-5', src: 'assets/asteroid-5.png' },
    { name: 'asteroid-8', src: 'assets/asteroid-8.png' },
    { name: 'boss-1', src: 'assets/boss-1.png' },
    { name: 'background', src: 'assets/background.jpg' },
    { name: 'background-dust-1', src: 'assets/background-dust-1.png' },
    { name: 'enemy-1', src: 'assets/enemy-1.png' },
    { name: 'turret-1', src: 'assets/turret-1.png' },
    { name: 'final-boss', src: 'assets/final-boss.png' },
    { name: 'final-boss-intro', src: 'assets/final-boss-intro.png' },
    { name: 'boss-2', src: 'assets/boss-2.png' },
    { name: 'boss-2-active', src: 'assets/boss-2-active.png' },
    { name: 'background-red-giant', src: 'assets/background-red-giant.png' },
    { name: 'final-boss-turret', src: 'assets/final-boss-turret.png' },
];

// export const GAME_SCRIPTS = [
//     'Assets.js',
//     'Game.js',
//     'Abstract/CanvasObject.js',
//     'Abstract/CanvasObjectShape.js',
//     'Abstract/CanvasObjectHealth.js',
//     'Abstract/CanvasObjectPoints.js',
//     'Object/Text.js',
//     'Object/Fighter.js',
//     'Object/FighterLevel.js',
//     'Object/Bullet.js',
//     'Object/BulletImpact.js',
//     'Object/Asteroid.js',
//     'Object/Enemy.js',
//     'Object/Boss.js',
//     'Object/BossHp.js',
//     'Object/Background.js',
//     'Object/Menu.js',
//     'Object/Turret.js',
//     'Object/BulletAngle.js',
//     'Object/BossFinal.js',
//     'Object/BossFinalIntro.js',
//     'Object/BossAsteroid.js',
//     'Abstract/ScenarioObject.js',
//     'Level/Scenario/Intro.js',
//     'Level/Scenario/Level1.js',
//     'Level/Scenario/Level1Outro.js',
//     'Level/Scenario/Level2Intro.js',
//     'Level/Scenario/Level2.js',
//     'Level/Scenario/Level2Outro.js',
//     'Level/Scenario/Level3.js',
//     'Level/Scenario/Challange.js',
//     'Level/Level.js',
//     'Level/Texts.js',
// ];


