export enum CardType {
  Army = "army", //士兵
  Harvest = "harvest", //丰收
  Monopoly = "monopoly", //垄断
  Score = "score" //分数卡
}

export enum CardName {
  Army = "士兵卡",
  Harvest = "丰收卡",
  Monopoly = "垄断卡",
  Score = "分数卡"
}

export const CardTypeToName = {
  [CardType.Army]: CardName.Army,
  [CardType.Harvest]: CardName.Harvest,
  [CardType.Monopoly]: CardName.Monopoly,
  [CardType.Score]: CardName.Score
};

export interface Card {
  // owner: PlayerId;
  type: CardType;
  name: CardName;
}

export type Cards = Card[];

export const HarvestAddNum = 2;
