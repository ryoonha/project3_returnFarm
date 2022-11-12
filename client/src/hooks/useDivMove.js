import { useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

const useDivMove = () => {
  const divPos = useSpring({ x: 0, y: 0 });
  const bindDivPos = useDrag((params) => {
    divPos.x.set(params.offset[0]);
    divPos.y.set(params.offset[1]);
  });
  return [divPos.x, divPos.y, bindDivPos];
};

export default useDivMove;
