import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dateName } from "../../../data/etc";
import { handleTile } from "../../../stores/reducers/stateSlice";

const LandStatusBox = styled.div`
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: ${(props) => (props.statusCheck ? "50%" : "40%")};
  width: 250px;
  transform: translate(50%, -50%);
  background-color: var(--back);
  color: white;
  text-align: center;

  div {
    width: 100%;
  }
  .name {
    background-color: var(--headerBack);
  }
  .axisBox {
    .x {
      color: rgb(255, 38, 38);
    }
    .z {
      color: rgb(16, 16, 255);
    }
    margin-bottom: 5px;
  }
  .randStatuBox {
    .statusBox {
      flex-direction: column;
      .statusDetailBox {
        justify-content: space-around;
        width: 50%;
        .waterBox {
          .water {
            color: rgb(51, 146, 255);
          }
        }
        .healthBox {
          .health {
            color: rgb(111, 207, 127);
          }
        }
        .iconBox {
          margin: 5px 0px 5px 0px;

          font-size: 30px;
          /* background-color: antiquewhite; */
          .waterIcon {
            color: rgb(78, 160, 255);
          }
          .healthIcon {
            color: rgb(85, 180, 101);
          }
        }
      }
    }
  }
  .title {
    margin-top: 5px;
    color: var(--title);
  }
`;

const LandStatus = ({ tileData }) => {
  const dispatch = useDispatch();
  const { x, z, data } = tileData;
  const [statusCheck, setStatusCheck] = useState(false);

  // else {
  //   if (name === "나무") {
  //     obj = <FontAwesomeIcon icon="fa-solid fa-tree" />;
  //   } else if (name === "돌") {
  //     obj =
  //   } else if (name === "잡초") {
  //     obj =
  //   } else if (name === "꽃") {
  //     obj =
  //   }
  // }

  useEffect(() => {
    if (data.status) {
      const [name, num] = data.status.split("_");
      if (name === "작물") {
        setStatusCheck(!statusCheck);
      }
    }
  }, []);

  return (
    <LandStatusBox
      statusCheck={statusCheck}
      className="cc"
      onClick={() => {
        dispatch(handleTile({ x: null, z: null, data: null }));
      }}
    >
      <div className="name">
        {data.status ? data.status.split("_")[0] : "빈 땅"}
      </div>
      <div className="axisBox">
        <div className="title">좌표</div>
        <div className="x">x: {x}</div>
        <div className="z">z: {z}</div>
      </div>
      {statusCheck ? (
        <div className="randStatuBox">
          <div className="statusBox cc">
            <div className="title">상태</div>
            <div className="statusDetailBox cc">
              <div className="waterBox">
                <div className="water">수분</div>
                <div className="iconBox cc">
                  <FontAwesomeIcon
                    className="waterIcon"
                    icon="fa-solid fa-droplet"
                  />
                </div>
                <div className="percent">0%</div>
              </div>
              <div className="healthBox">
                <div className="health">건강</div>
                <div className="iconBox cc">
                  <FontAwesomeIcon
                    className="healthIcon"
                    icon="fa-solid fa-heart"
                  />
                </div>
                <div className="percent">0%</div>
              </div>
            </div>
          </div>
          <div className="plantedTimeBox">
            <div className="title">심은 시간</div>
            <div className="plantedTime">
              {data.estimated_time
                ? data.estimated_time
                    .split("/")
                    .map((data, index) => (
                      <span
                        key={index}
                        className={`time${index}`}
                      >{`${data}${dateName[index]} `}</span>
                    ))
                : "심은 씨앗이 없습니다!"}
            </div>
          </div>
          <div className="estimatedTimeBox">
            <div className="title">수확 예상 시간</div>
            <div className="estimatedTime">
              {data.estimated_time
                ? data.estimated_time
                    .split("/")
                    .map((data, index) => (
                      <span
                        key={index}
                        className={`time${index}`}
                      >{`${data}${dateName[index]} `}</span>
                    ))
                : "심은 씨앗이 없습니다!"}
            </div>
          </div>
        </div>
      ) : null}
    </LandStatusBox>
  );
};

export default LandStatus;
