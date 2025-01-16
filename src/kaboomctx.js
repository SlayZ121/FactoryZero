import kaboom from "kaboom";

export const scale = 2;
export const k = kaboom({
  width: 640 * 2, //random pixell size issue without it
  height: 360 * 2,
  scale,
  letterbox: true,
  global: false, //so as to not use kaboom directly everywhere
});
