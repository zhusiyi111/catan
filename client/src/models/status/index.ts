export enum Status {
  WaitingOthers = "wait",
  Main = "main",
  BuildVillage = "buildVillage",
  SelectDot = "selectDot",
  SelectMyTown = "selectMyTown",
  SelectArea = "selectArea",
  SelectTargetVillage = "selectTargetVillage",
  UpgradeCity = "upgradeCity",
  UpgradeWarehouse = "upgradeWarehouse",
  UpgradeCastle = "upgradeCastle",
  UpgradeWonder = "upgradeWonder",
  UseArmyCard = "useArmyCard",
  RobVillage = "robVillage",
  RobDice = "robDice"
}

const initialState: Status[] = [Status.Main];

export default {
  state: initialState,
  reducers: {
    returnMain() {
      return [Status.Main];
    },
    pushStatus: (s: Status[], payload: Status) => {
      return s.concat([payload]);
    },
    removeStatus: (s: Status[], payload: Status) => {
      const index = s.findIndex(v => v === payload);
      if (index) {
        const clone = s.slice(0);
        clone.splice(index, 1);
        return clone;
      } else {
        return s;
      }
    }
  },
  effects: (dispatch: any) => ({
    clickBuildVillage() {
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.BuildVillage);
      dispatch.status.pushStatus(Status.SelectDot);
      dispatch.dots.showLegalDots();
    },
    /* 点击升级城市 */
    clickUpgradeCity() {
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.UpgradeCity);
      dispatch.status.pushStatus(Status.SelectMyTown);
    },
    /* 点击升级仓库 */
    clickUpgradeWarehouse() {
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.UpgradeWarehouse);
      dispatch.status.pushStatus(Status.SelectMyTown);
    },
    /* 点击升级城堡 */
    clickUpgradeCastle() {
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.UpgradeCastle);
      dispatch.status.pushStatus(Status.SelectMyTown);
    },
    /* 点击升级奇观 */
    clickUpgradeWonder() {
      dispatch.status.returnMain();
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.UpgradeWonder);
      dispatch.status.pushStatus(Status.SelectMyTown);
    },
    /* 点击使用士兵卡 */
    clickUseArmyCard() {
      dispatch.status.returnMain();
      dispatch.status.pushStatus(Status.UseArmyCard);
      dispatch.status.pushStatus(Status.SelectArea);
    }
  })
};
