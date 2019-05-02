"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CardType;
(function (CardType) {
    CardType["Army"] = "army";
    CardType["Harvest"] = "harvest";
    CardType["Monopoly"] = "monopoly";
    CardType["Score"] = "score"; //分数卡
})(CardType = exports.CardType || (exports.CardType = {}));
var CardName;
(function (CardName) {
    CardName["Army"] = "\u58EB\u5175\u5361";
    CardName["Harvest"] = "\u4E30\u6536\u5361";
    CardName["Monopoly"] = "\u5784\u65AD\u5361";
    CardName["Score"] = "\u5206\u6570\u5361";
})(CardName = exports.CardName || (exports.CardName = {}));
exports.CardTypeToName = {
    [CardType.Army]: CardName.Army,
    [CardType.Harvest]: CardName.Harvest,
    [CardType.Monopoly]: CardName.Monopoly,
    [CardType.Score]: CardName.Score
};
exports.HarvestAddNum = 2;
//# sourceMappingURL=card.js.map