import { k } from "./kaboomctx";
import { room1 } from "./scenes/room1";
import { room2 } from "./scenes/room2";
k.loadFont("glyphmesss", "./assets/glyphmesss.ttf");

k.loadSprite("player", "./assets/sprites/u.png", {
  sliceX: 8,
  sliceY: 9,
  anims: {
    idle: { from: 0, to: 7, loop: true },
    run: { from: 8, to: 13, loop: true },
    jump: 51,
    fall: 54,
    explode: { from: 64, to: 69 },
    attack: { from: 24, to: 28, speed: 16 },
  },
});

k.loadSprite("drone", "./assets/sprites/dr0ne.png", {
  sliceX: 6,
  sliceY: 3,
  anims: {
    flying: { from: 0, to: 3, loop: true },
    attack: { from: 6, to: 11, loop: true },
    explode: { from: 12, to: 17 },
  },
});

k.loadSprite("burner", "./assets/sprites/burn3r.png", {
  sliceX: 5,
  sliceY: 6,
  anims: {
    idle: { from: 0, to: 3, loop: true },
    run: { from: 6, to: 8, loop: true },
    "open-fire": { from: 10, to: 14 },
    fire: { from: 15, to: 20, loop: true },
    "shut-fire": { from: 20, to: 23 },
    explode: { from: 25, to: 29 },
  },
});
//sprite atlas to cut off from sprite sheet
k.loadSpriteAtlas("./assets/ui.png", {
  healthBar: {
    x: 16,
    y: 16,
    width: 60,
    height: 48,
    sliceY: 3,
  },
});

k.loadSpriteAtlas("./assets/animations.png", {
  cartridge: {
    x: 125,
    y: 145,
    width: 134,
    height: 16,
    sliceX: 8,
    anims: {
      default: { from: 0, to: 4, loop: true, speed: 7 },
    },
  },
});

k.loadSprite("tileset", "./assets/tileset.png", {
  sliceX: 33,
  sliceY: 21,
});

k.loadSprite("background", "./assets/background.png", {
  sliceX: 13,
  sliceY: 25,
});

k.loadSound("notify", "./assets/sounds/notify.mp3");
k.loadSound("boom", "./assets/sounds/boom.wav");
k.loadSound("health", "./assets/sounds/health.wav");
k.loadSound("flamethrower", "./assets/sounds/flamethrower.mp3");

k.loadSprite("room1", "./assets/maps/room1.png");
k.loadSprite("room2", "./assets/maps/room2.png");

k.loadSprite("guardian", "./assets/sprites/guard1an.png", {
  sliceX: 6,
  sliceY: 5,
  anims: {
    idle: { from: 0, to: 9, loop: true },
    attack: { from: 11, to: 15, loop: false },
    die: { from: 25, to: 30, loop: false },
  },
});

async function main() {
  const room1Data = await (await fetch("./assets/maps/room1.json")).json();
  const room2data = await (await fetch("./assets/maps/room2.json")).json();
  k.scene("room1", () => {
    room1(k, room1Data);
  });

  k.scene("room2", () => {
    room2();
  });
}

main();
//need async so as to use await

k.scene("intro", () => {
  k.onKeyPress("enter", () => {
    k.go("room1");
  });
});

k.go("intro");
