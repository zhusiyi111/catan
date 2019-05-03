import React from "react";
import "./index.less";

import Dice1 from "../../../assets/icon/dice1.svg";
import Dice2 from "../../../assets/icon/dice2.svg";
import Dice3 from "../../../assets/icon/dice3.svg";
import Dice4 from "../../../assets/icon/dice4.svg";
import Dice5 from "../../../assets/icon/dice5.svg";
import Dice6 from "../../../assets/icon/dice6.svg";

const DiceMap: { [i: string]: string } = {
  1: Dice1,
  2: Dice2,
  3: Dice3,
  4: Dice4,
  5: Dice5,
  6: Dice6
};

export default function Dice({ number }: { number?: number }) {
  return (
    <div className="dice">
      <img alt="dice" src={DiceMap[number || 1]} />
    </div>
  );
}
