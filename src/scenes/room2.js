import { makePlayer } from "../entities/player";
import { makecartridge } from "../entities/cartridge";
import { state } from "../state/globalStateManage";
import { healthbar } from "../ui/healthbar";
import { setExit } from "./roomUtil";
import {
  setBGColor,
  setCameraControls,
  setCameraZone,
  setMapColliders,
} from "./roomUtil";
import { k } from "../kaboomctx";

export function room2(k, roomData, prevData) {
  setBGColor(k, "#a2aed5");

  k.camScale(4);
  k.camPos(170, 100);
  k.setGravity(1000);

  const roomLayers = roomData.layers;
  const map = k.add([k.pos(0, 0), k.sprite("room2")]);

  const colliders = [];
  const positions = [];
  const cameras = [];
  const exits = [];
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
  setExit(k, map, exits, "room1");

  for (const position of positions) {
    if (position.name === "entrance-1" && prevData.exitName === "exit-1") {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassThrough();
      continue;
    }

    if (position.name === "entrance-2" && prevData.exitName === "exit-2") {
      player.setPosition(position.x, position.y);
      player.setControls();
      player.setEvents();
      player.enablePassThrough();
      player.respawn(1000, "room2", { exitName: "exit-2" });
      k.camPos(player.pos);
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
