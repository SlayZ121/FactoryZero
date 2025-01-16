import { k } from "./kaboomctx";
k.loadFont("glyphmess", "./assets/glyphmesss.ttf");

k.loadSprite("player", "./assets/sprites/u.png", {
  sliceX: 8,
  sliceY: 9,
  anims: {
    idle: { from: 0, to: 7, loop: true },
    run: { from: 8, to: 13, loop: true },
    jump: { from: 51, to: 51, loop: true },
    fall: { from: 54, to: 54, loop: true },
    explode: { from: 64, to: 69 },
    attack: { from: 24, to: 28, speed: 16 },
  },
});

k.loadSprite("drone", "./assets/sprites/dr0ne/png", {
  sliceX: 6,
  sliceY: 3,
  anims: {
    idle: { from: 0, to: 6, loop: true },
    explode: { from: 7, to: 18, loop: false },
  },
});

k.loadSprite("guardian", "./assets/guard1an.png", {
  sliceX: 6,
  sliceY: 5,
  anims: {
    idle: { from: 0, to: 9, loop: true },
    attack: { from: 11, to: 15, loop: false },
    die: { from: 25, to: 30, loop: false },
  },
});


