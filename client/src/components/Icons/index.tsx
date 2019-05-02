import React from "react";


export const IconName: { [k: string]: string } = {
  Town: "#icon-fangzi",
  Warehouse: "#icon-cangku",
  City: "#icon-chengshi",
  Castle: "#icon-chengbao",
  Wonder: "#icon-jinzita"
};

interface Props {
  type: string;
  [i: string]: string;
}

export default function({ type, ...props }: Props) {
  return (
    <svg className="icon" style={{ ...props }} aria-hidden="true">
      <use xlinkHref={type} />
    </svg>
  );
}
