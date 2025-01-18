export const statePropsEnum = {
  playerHp: "playerHp",
  isDoubleJumpUnlocked: "isDoubleJumpUnlocked",
  playerInBossFight: "playerInBossFight",
  BossDefeated: "BossDefeated",
};

function initStateManager() {
  const state = {
    playerHp: 3,
    maxPlayerHp: 3,
    isDoubleJumpUnlocked: false,
    playerInBossFight: false,
    BossDefeated: false,
  };

  return {
    current() {
      return { ...state };
    },
    set(prop, val) {
      state[prop] = val;
    },
  };
}

export const state = initStateManager();
