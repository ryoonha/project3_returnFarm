import clickSound from "./click.mp3";
import clickAction from "./action.mp3";
import clickBackground from "./backgroundDay.mp3";
import move from "./move.mp3";

export const soundData = {
  click: clickSound,
  action: clickAction,
  background: clickBackground,
  move: move,
};

const handleSound = (type) => {
  const audio = new Audio(soundData[type]);
  audio.volume = 0.5;
  audio.play();
};

export default handleSound;
