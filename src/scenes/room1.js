import { makeBoss } from "../entities/boss";
import { makedrone } from "../entities/drone";
import { makePlayer } from "../entities/player";
import { state } from "../state/globalStateManage";
import { k } from "../kaboomctx";
import {
  setBGColor,
  setCameraControls,
  setCameraZone,
  setExit,
  setMapColliders,
} from "./roomUtil";
import { makecartridge } from "../entities/cartridge";
import { healthbar } from "../ui/healthbar";

export function room1(k, roomData, prevData) {
  setBGColor(k, "#a2aed5");

  k.camScale(4);
  k.camPos(170, 100);
  k.setGravity(1000);

  const roomLayers = roomData.layers;

  const map = k.add([k.pos(0, 0), k.sprite("room1")]);
  const colliders = [];
  const positions = [];
  const exits = [];
  const cameras = [];

  for (const layer of roomLayers) {
    if (layer.name === "cameras") {
      cameras.push(...layer.objects);
    }
    if (layer.name === "positions") {
      positions.push(...layer.objects);
      continue;
    }

    if (layer.name === "exits") {
      exits.push(...layer.objects);
      continue;
    }

    if (layer.name === "colliders") {
      colliders.push(...layer.objects);
    }
  }

  setMapColliders(k, map, colliders);
  setCameraZone(k, map, cameras);

  const player = k.add(makePlayer(k));
  setCameraControls(k, player, map, roomData);

  setExit(k, map, exits, "room2");
  for (const position of positions) {
    if (position.name === "player" && !prevData.exitName) {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassThrough();
      player.respawn(1000, "room1");
      continue;
    }
    if (position.name === "entrance-1" && prevData.exitName === "exit-1") {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassThrough();
      player.respawn(1000, "room1");
      k.camPos(player.pos);
      continue;
    }

    if (position.name === "entrance-2" && prevData.exitName === "exit-2") {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassThrough();
      player.respawn(1000, "room1");
      k.camPos(player.pos);
      continue;
    }

    if (position.type === "drone") {
      const drone = map.add(makedrone(k, k.vec2(position.x, position.y)));
      drone.setBehavior();
      drone.setEvents();
      continue;
    }
    if (position.name === "boss" && !state.current().BossDefeated) {
      const boss = map.add(makeBoss(k, k.vec2(position.x, position.y)));
      boss.setBehavior();
      boss.setEvents();
      continue;
    }
    if (position.type === "cartridge") {
      map.add(makecartridge(k, k.vec2(position.x, position.y)));
    }
  }

  healthbar.setEvents();
  healthbar.trigger("update");
  k.add(healthbar);
}
