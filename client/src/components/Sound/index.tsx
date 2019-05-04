import React, { Component } from "react";

import Bgm from "../../assets/music/bgm.mp3";

import BuildSound from "../../assets/music/event/Build.ogg";
import ClickSound from "../../assets/music/event/DefButton.ogg";
import Dice7Sound from "../../assets/music/event/Dice7.ogg";
import EndTurnSdound from "../../assets/music/event/EndTurn.ogg";
import RobVillageSound from "../../assets/music/event/Rob.ogg";
import RobSound from "../../assets/music/event/Robber.ogg";
import DealSound from "../../assets/music/event/DefWndButton.ogg";

export enum SoundType {
  Bgm = "BgmSound",
  Build = "BuildSound",
  Click = "ClickSound",
  Dice7 = "Dice7Sound",
  EndTurn = "EndTurnSound",
  Rob = "RobSound",
  RobVillage = "RobVillageSound",
  Deal = "DealSound"
}

export class Sound extends Component {
  componentDidMount() {
    generateAudio(SoundType.Bgm).play();
  }

  render() {
    return (
      <div>
        <audio src={BuildSound} id={SoundType.Build} />
        <audio src={ClickSound} id={SoundType.Click} />
        <audio src={Dice7Sound} id={SoundType.Dice7} />
        <audio src={EndTurnSdound} id={SoundType.EndTurn} />
        <audio src={RobSound} id={SoundType.Rob} />
        <audio src={RobVillageSound} id={SoundType.RobVillage} />
        <audio src={DealSound} id={SoundType.Deal} />
        <audio
          id={SoundType.Bgm}
          src={Bgm}
          hidden={true}
          autoPlay={true}
          loop={true}
        />
      </div>
    );
  }
}

function generateAudio(type: SoundType) {
  return document.querySelector(`#${type}`) as HTMLAudioElement;
}

export default (type: SoundType) => generateAudio(type);
