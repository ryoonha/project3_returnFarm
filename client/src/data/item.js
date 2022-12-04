import { Seed } from "../components/models/plant/Seed";
import Tomato from "../components/models/plant/Tomato";

export const itemList = {
  삽: { img: "/images/items/tools/shovel.png", desc: "땅을 팔 수 있습니다." },
  물뿌리개: {
    img: "/images/items/tools/wateringTool.png",
    desc: "대상에 물을 줄 수 있습니다.",
  },
  해바라기: {
    img: "/images/items/crops/sunflower.png",
    desc: "해바라기 입니다.",
  },
  토마토: {
    img: "/images/items/crops/tomato.png",
    desc: "토마토 입니다.",
  },
  옥수수: { img: "/images/items/crops/corn.png", desc: "옥수수 입니다." },
  사과: { img: "/images/items/crops/apple.png", desc: "사과 입니다." },
  벼: { img: "/images/items/crops/wheat.png", desc: "벼 입니다." },
  옥수수씨앗: {
    img: "/images/items/crops/cornSeed.png",
    desc: "옥수수씨앗 입니다.",
    modelSeed: <Seed />,
  },
  토마토씨앗: {
    img: "/images/items/crops/tomatoSeed.png",
    desc: "토마토씨앗 입니다.",
    modelSeed: <Seed />,
    modelGrow: <Tomato />,
  },
  해바라기씨앗: {
    img: "/images/items/crops/sunflowerSeed.png",
    desc: "해바라기씨앗 입니다.",
    modelSeed: <Seed />,
  },
  사과씨앗: {
    img: "/images/items/crops/appleSeed.png",
    desc: "사과씨앗 입니다.",
    modelSeed: <Seed />,
  },
  벼씨앗: {
    img: "/images/items/crops/wheatSeed.png",
    desc: "벼씨앗 입니다.",
    modelSeed: <Seed />,
  },
};
