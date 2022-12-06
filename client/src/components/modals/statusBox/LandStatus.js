import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { dateName } from "../../../data/etc";
import { handleTile } from "../../../stores/reducers/stateSlice";
import { bagUpdate, tileUpdate } from "../../../stores/reducers/userSlice";

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
    .buttonBox {
      margin: 15px 0px;
      .button {
        width: 70px;
        height: 30px;
        margin: 0px auto;
        background-color: #3a3c3d;
        transition: 0.2s;

        :first-child:hover {
          background-color: rgb(60, 123, 148);
        }
        :last-child:hover {
          background-color: rgb(121, 62, 62);
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
  const myBag = useSelector((state) => state.user.bag);
  const { x, z, data, seed, index } = tileData;

  const expectationTime = () => {
    const [year, month, day] = data.estimated_time.split(".");
    let exTime = new Date(year, month - 1, day);
    exTime.setDate(exTime.getDate() + 30);
    return exTime.toLocaleDateString().slice(0, -1);
  };

  const itemBagPush = (addItem) => {
    dispatch(
      bagUpdate({
        bag: [
          ...myBag,
          {
            item_count: 1,
            item_name: addItem,
            quality: 1,
            time: new Date().toLocaleDateString().slice(0, -1),
          },
        ],
      })
    );
  };

  return (
    <LandStatusBox
      statusCheck={seed}
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
      {seed ? (
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
                <div className="percent">100%</div>
              </div>
            </div>
          </div>
          <div className="plantedTimeBox">
            <div className="title">심은 시간</div>
            <div className="plantedTime">
              {data.estimated_time
                ? data.estimated_time
                : "심은 씨앗이 없습니다!"}
            </div>
          </div>
          <div className="estimatedTimeBox">
            <div className="title">수확 예상 시간</div>
            <div className="estimatedTime">
              {data.estimated_time
                ? expectationTime()
                : "심은 씨앗이 없습니다!"}
            </div>
          </div>
          <div className="buttonBox cc">
            <div
              className="button cc"
              onClick={() => {
                itemBagPush(data.status.split("씨앗")[0]);
                // itemBagPush(data.status.split("씨앗")[0]);
                dispatch(
                  tileUpdate({
                    tile: { newData: null, index: index, timeDate: null },
                  })
                );
              }}
            >
              수확
            </div>
            <div
              className="button cc"
              onClick={() => alert("미구현 기능입니다!")}
            >
              제거
            </div>
          </div>
        </div>
      ) : null}
    </LandStatusBox>
  );
};

export default LandStatus;
