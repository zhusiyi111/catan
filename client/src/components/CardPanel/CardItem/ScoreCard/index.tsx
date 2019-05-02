import React from "react";

import { CardDescription, CardType } from "../../../../models/card";

export default function ScoreCard() {
  return (
    <div>
      <p>{CardDescription[CardType.Score]}</p>
    </div>
  );
}
