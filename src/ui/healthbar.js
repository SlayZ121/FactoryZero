import { state } from "../state/globalStateManage";
import { k } from "../kaboomctx";
function makeHealthBar(k) {
  return k.make([
    k.sprite("healthBar", { frame: 0 }), //instead of anim here we display a static frame
    k.fixed(),
    k.pos(10, 10),
    k.scale(4),
    {
      hpMapping: {
        //which hp what frame to display
        1: 2,
        2: 1,
        3: 0,
      },

      setEvents() {
        this.on("update", () => {
          const currenthp = state.current().playerHp;
          if (currenthp === 0) {
            k.destroy(this);
            return;
          }
          this.frame = this.hpMapping[currenthp];
        });
      },
    },
  ]);
}
export const healthbar = makeHealthBar(k);
