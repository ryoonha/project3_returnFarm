import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import styled from "styled-components";
import handleSound from "../../../data/sounds/sound";
import { useDispatch, useSelector } from "react-redux";
import { handleEventLock } from "../../../stores/reducers/stateSlice";
import { itemList } from "../../../data/item";
import { bagUpdate, myInfoSave } from "../../../stores/reducers/userSlice";

const CatMarket = styled.div`
  position: absolute;
  flex-direction: column;
  top: -120px;
  left: -25px;
  width: 300px;
  height: 100px;
  background-color: rgba(240, 248, 255, 0.767);

  .chackBox {
    width: 100%;
    div {
      width: 100%;
      :hover {
        background-color: rgba(128, 128, 128, 0.774);
      }
    }
  }
`;

const MarketBox = styled.div`
  .container {
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #fdffe3;
    .itemBox {
      position: relative;
      width: 50px;
      height: 50px;
      :hover {
        background-color: #ffba39;
      }
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .itemName {
        position: absolute;
        bottom: 0px;
        width: 100%;
        font-size: 10px;
        background-color: rgba(0, 0, 0, 0.473);
        color: white;
      }
    }
  }
`;

const CatBox = styled.div`
  .sellCat {
    img {
      width: 25px;
      height: 25px;
      object-fit: cover;
    }
  }
`;

const Catmarket = ({ mybag, setHover, type, bagUpdate }) => {
  const catMarketList = [
    {
      item_count: 1,
      item_name: "토마토씨앗",
      quality: 1,
      time: new Date().toLocaleDateString().slice(0, -1),
    },
    {
      item_count: 1,
      item_name: "물뿌리개",
      quality: 1,
      time: new Date().toLocaleDateString().slice(0, -1),
    },
    {
      item_count: 1,
      item_name: "삽",
      quality: 1,
      time: new Date().toLocaleDateString().slice(0, -1),
    },
  ];
  return (
    <MarketBox>
      <div className="container cc">
        {(type === "sell" ? mybag : catMarketList).map((data, index) => (
          <div
            className="itemBox cc"
            key={index}
            style={data ? { border: "1px solid rgb(173, 173, 173)" } : null}
            onMouseEnter={() => {
              setHover(data);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            onClick={() => {
              handleSound("coin");
              if (type === "sell") {
                const newBag = mybag.filter(
                  (mData, mIndex) => index !== mIndex
                );
                bagUpdate(newBag);
              } else {
                bagUpdate([...mybag, data]);
              }
            }}
          >
            <img src={itemList[data.item_name].img} alt="" />
            <div className="itemName cc">{data.item_name}</div>
          </div>
        ))}
      </div>
    </MarketBox>
  );
};

export function Cat(props) {
  const dispatch = useDispatch();
  const { nodes, materials } = useGLTF("/models/cat/scene.gltf");
  const ref = useRef();
  const [intersecting, setIntersection] = useState(false);
  const [check, setChack] = useState(false);
  const [hover, setHover] = useState(false);
  const mybag = useSelector((state) => state.user.bag);
  const { haetsal } = useSelector((state) => state.user.myInfo);

  const styles = {
    width: intersecting ? "250px" : "150px",
    height: "auto",
    color: "black",
    background: "rgba(129, 129, 129, 0.521)",
    textAlign: "center",
    fontSize: "30px",
    borderRadius: "20px",
    transform: `translate(${intersecting ? "-120px" : "-70px"},-150px)`,
    zIndex: "-5000",
  };

  const handleBagUpdate = (newBag) => {
    if (check === "sell") {
      dispatch(
        myInfoSave({
          data: {
            haes_sal_amount: haetsal + itemList[hover.item_name].haetsal,
          },
        })
      );
      dispatch(bagUpdate({ bag: newBag }));
    } else {
      dispatch(
        myInfoSave({
          data: {
            haes_sal_amount: haetsal - itemList[hover.item_name].haetsal * 2,
          },
        })
      );
      dispatch(bagUpdate({ bag: newBag }));
    }
    // setHover(false);
  };

  const boxArr = {
    sell: {
      component: (
        <Catmarket
          mybag={mybag}
          setHover={setHover}
          bagUpdate={handleBagUpdate}
          type={"sell"}
        />
      ),
      text: "팔꺼냥?",
    },
    buy: {
      component: (
        <Catmarket
          mybag={mybag}
          setHover={setHover}
          bagUpdate={handleBagUpdate}
          type={"buy"}
        />
      ),
      text: "살꺼냥?",
    },
  };

  return (
    <RigidBody ref={ref} type="fixed">
      {intersecting ? (
        <Html style={styles}>
          <CatMarket
            className="cc"
            // 중복되는 이벤트 코드
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            {!check ? (
              <div className="chackBox">
                <div
                  onClick={() => {
                    setChack("buy");
                    handleSound("click");
                  }}
                >
                  구입
                </div>
                <div
                  onClick={() => {
                    setChack("sell");
                    handleSound("click");
                  }}
                >
                  판매
                </div>
              </div>
            ) : null}
            {boxArr[check] ? boxArr[check].component : null}
          </CatMarket>
          <div
            // 중복되는 이벤트 코드
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            {!check ? "무엇이 필요하냥?" : null}
          </div>
          <CatBox
            // 중복되는 이벤트 코드
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            {hover ? (
              <div className="sellCat cc">
                {check === "sell"
                  ? itemList[hover.item_name].haetsal
                  : itemList[hover.item_name].haetsal * 2}
                <img src="/images/tokens/day.png" alt="" />
                {check === "sell" ? "에 사주겠다냥" : "에 팔고있다냥"}
              </div>
            ) : boxArr[check] ? (
              boxArr[check].text
            ) : null}
          </CatBox>
        </Html>
      ) : (
        <Html style={styles}>
          <div
            // 중복되는 이벤트 코드
            onMouseOver={() => {
              dispatch(handleEventLock({ lock: true }));
            }}
            onMouseOut={() => {
              dispatch(handleEventLock({ lock: false }));
            }}
          >
            냥냥~
          </div>
        </Html>
      )}

      <group {...props} dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            geometry={nodes.Object_2.geometry}
            material={materials.lambert2SG}
          />
          <mesh
            castShadow
            geometry={nodes.Object_3.geometry}
            material={materials.lambert2SG}
          />
        </group>
      </group>
      <CuboidCollider
        args={[10, 5, 10]}
        sensor
        onIntersectionEnter={() => {
          setIntersection(true);
        }}
        onIntersectionExit={() => {
          setChack(false);
          setHover(false);
          setIntersection(false);
        }}
      />
    </RigidBody>
  );
}

useGLTF.preload("/models/cat/scene.gltf");
