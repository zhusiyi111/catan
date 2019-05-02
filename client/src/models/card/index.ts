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

export interface Card {
  name: CardName;
  type: CardType;
}

export const CardDescription = {
  [CardType.Army]:
    "使用后指定某块区域不产出资源，并掠夺该地周围任意一位玩家的随机一个资源",
  [CardType.Harvest]: "立即获得任意2个相同类型的资源",
  [CardType.Monopoly]: "立即垄断市面上某类资源",
  [CardType.Score]: "立即获得1分数点"
};

export type Cards = Card[];
