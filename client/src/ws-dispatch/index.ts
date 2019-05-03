import Event from "./event";
import { default as dispatch } from "./dispatch";

const EventDispatchMap = {
  /* flow */
  [Event.NewRound]: dispatch.newRound,
  [Event.UpdateStore]: dispatch.updateStore,
  [Event.GameOver]: dispatch.gameOver,
  [Event.RobDice]: dispatch.RobDice,
  [Event.RobAreaFromDice]: dispatch.robAreaFromDice,

  /* player */
  [Event.DealInBlackMarket]: dispatch.dealInBlackMarket,

  /* village */
  [Event.BuildVillage]: dispatch.buildVillage,
  [Event.UpgradeCity]: dispatch.upgradeCity,
  [Event.RobResult]: dispatch.robResult,

  /* card */
  [Event.DrawCard]: dispatch.drawCard,
  [Event.UseHarvestCard]: dispatch.useHarvestCard,
  [Event.UseArmyCard]: dispatch.useArmyCard
};

export default function(wsData: string) {
  const { type, payload } = JSON.parse(wsData);

  const func = EventDispatchMap[type];
  if (func) {
    func(payload);
  } else {
    console.log("没命中事件");
  }
}
