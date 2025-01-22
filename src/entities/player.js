import { state, statePropsEnum } from "../state/globalStateManage";
import { healthbar } from "../ui/healthbar";
import { makeBlink } from "./sharedLogic";

export function makePlayer(k) {
  //add-creates and displays. k.make->only creates it
  return k.make([
    k.pos(),
    k.sprite("player"),
    k.area({
      shape: new k.Rect(k.vec2(0, 18), 12, 12),
    }),
    k.anchor("center"),
    k.body({ mass: 100, jumpForce: 320 }),
    k.doubleJump(state.current().isDoubleJumpUnlocked ? 2 : 1),
    k.opacity(),
    k.health(state.current().playerHp),
    "player",
    {
      speed: 150,
      isAttacking: false,
      setPosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
      },
      enablePassThrough() {
        this.onBeforePhysicsResolve((collision) => {
          if (collision.target.is("passthrough") && this.isJumping()) {
            collision.preventResolution();
          }
        });
      },
      setControls() {
        this.controlHandlers = [];
        //for attack. keypress
        this.controlHandlers.push(
          k.onKeyPress((key) => {
            if (key === "x") {
              if (this.curAnim() !== "jump") this.play("jump");
              this.doubleJump();
            }
            if (
              key === "z" &&
              this.curAnim() != "attack" &&
              this.isGrounded()
            ) {
              this.isAttacking = true;
              this.add([
                k.pos(this.flipX ? -25 : 0, 10),
                k.area({
                  shape: new k.Rect(k.vec2(0), 25, 10),
                }),
                "sword-hitbox",
              ]);
              this.play("attack");
              this.onAnimEnd((anim) => {
                if (anim === "attack") {
                  const swordhitbox = k.get("sword-hitbox", {
                    recursive: true,
                  })[0];
                  if (swordhitbox) {
                    k.destroy(swordhitbox);
                  }
                  this.isAttacking = false;
                  this.play("idle");
                }
              });
            }
          })
        );

        //for left and right. keydown

        this.controlHandlers.push(
          k.onKeyDown((key) => {
            if (key === "left" && !this.isAttacking) {
              if (this.curAnim() != "run" && this.isGrounded) {
                this.play("run");
              }
              this.flipX = true;
              this.move(-this.speed, 0);
              return;
            }

            if (key === "right" && !this.isAttacking) {
              if (this.curAnim() != "run" && this.isGrounded) {
                this.play("run");
              }
              this.flipX = false;
              this.move(this.speed, 0);
              return;
            }
          })
        );

        //key release/ play idle when nothing playing
        this.controlHandlers.push(
          k.onKeyRelease(() => {
            if (
              this.curAnim() != "idle" &&
              this.curAnim() != "jump" &&
              this.curAnim() != "fall" &&
              this.curAnim() != "attack"
            ) {
              this.play("idle");
            }
          })
        );
      },
      disableControls() {
        for (const handler of this.controlHandlers) {
          handler.cancel();
        }
      },
      respawn(boundVal, dest, prevData = { exitName: null }) {
        k.onUpdate(()=>{
          if(this.pos.y>boundVal){
            k.go(dest,prevData);
          }
        })
      },
      setEvents() {
        this.onFall(() => {
          this.play("fall");
        });
        this.onFallOff(() => {
          this.play("fall");
        });
        this.onGround(() => {
          this.play("idle");
        });

        this.onHeadbutt(() => {
          this.play("fall");
        });

        this.on("heal", () => {
          state.set(statePropsEnum.playerHp, this.hp());
          healthbar.trigger("update");
          return;
        });

        this.on("hurt", () => {
          makeBlink(k, this);
          if (this.hp() > 0) {
            state.set(statePropsEnum.playerHp, this.hp());
            return;
          }
          k.play("boom");
          this.play("explode");
          state.set(statePropsEnum.playerHp, state.current().maxPlayerHp);
          this.onAnimEnd((anim) => {
            if (anim === "explode") {
              k.go("room1");
            }
          });
        });
      },
      enableDoubleJump() {
        this.numJumps = 2;
      },
    },
  ]);
}
