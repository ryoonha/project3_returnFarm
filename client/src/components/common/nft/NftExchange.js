import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { nftBuy, nftSell } from "../../../api/nft";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NftBox from "./NftBox";
import { modalChange } from "../../../stores/reducers/stateSlice";

const NftExchangeBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
  left: 50vw;
  transform: translateX(-50%);
  width: 700px;
  height: 600px;
  background-color: var(--back);

  .nftMarketItemBox {
    .nftMarketItem {
      :hover {
        background-color: rgba(255, 0, 0, 0.219);
      }
    }
  }

  .nftExlistBox {
  }
  .addBox {
    color: white;
    background-color: rgba(39, 39, 39, 0.616);
    cursor: pointer;
  }

  .myList {
    width: 100%;
    height: 100%;

    .nftSellBox {
      flex-direction: column;
      width: 100%;
      height: 100%;
      .nftItemList {
        flex-wrap: wrap;
        width: 100%;
        height: 50%;
        overflow-y: auto;

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          height: 50%; /* 스크롤바의 길이 */
          background: rgb(49, 49, 49); /* 스크롤바의 색상 */
        }
        ::-webkit-scrollbar-track {
          background: rgba(84, 155, 255, 0.1); /*스크롤바 뒷 배경 색상*/
        }
        .nftItem {
          position: relative;
          width: 210px;
          height: 90%;
          border: 1px solid black;
          margin: auto;
          margin-top: 5px;

          cursor: pointer;
          :hover {
            border: 1px solid aliceblue;
          }

          .nftItemName {
            position: absolute;
            bottom: 0px;
            width: 100%;
            text-align: center;
            background-color: rgba(190, 190, 190, 0.5);
          }
        }
      }
      .nftSellInfo {
        width: 100%;
        height: 50%;
        border-top: 2px solid rgb(216, 216, 216);

        .nftPreview {
          position: relative;
          width: 210px;
          height: 90%;
          font-size: 50px;
          color: white;
          border: 1px solid rgb(92, 92, 92);

          .nftPreviewName {
            position: absolute;
            bottom: 0px;
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: rgb(255, 255, 255);
            background-color: rgba(190, 190, 190, 0.5);
          }
        }
        .nftSellSetting {
          margin-left: 25px;
          text-align: center;
          color: white;

          input {
            width: 150px;
            border: 0px;
            margin-top: 1px;
            padding-left: 15px;
            text-align: center;
            background-color: rgb(61, 61, 61);
            color: white;
            :focus {
              outline: 1px solid rgb(158, 158, 158);
            }
          }
        }
      }
    }

    .nullList {
      font-size: 32px;
      text-align: center;
      margin-top: 50px;
      .nullText {
        color: rgb(231, 56, 56);
      }
      .nullIcon {
        font-size: 250px;
        color: rgb(255, 255, 255);
        opacity: 0.2;
      }
    }
  }

  .nftSellButton {
    width: 100%;
    height: 50px;
    justify-content: space-around;
    color: rgb(238, 238, 238);
    .up {
      width: 50%;
      height: 100%;
      background-color: rgb(56, 72, 87);
      :hover {
        background-color: rgb(56, 102, 146);
      }
    }
    .cancel {
      width: 50%;
      height: 100%;
      background-color: rgb(131, 86, 86);
      :hover {
        background-color: rgb(170, 77, 77);
      }
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const NftExchange = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const [sellCheck, setSellCheck] = useState(false);
  const [sellData, setSellData] = useState(false);
  const [sellingPrice, setSellingPrice] = useState(0);
  const { address } = useSelector((state) => state.user.myInfo);
  const myNftList = useSelector((state) => state.user.nft);
  const nftMarketList = useSelector((state) => state.game.nftList);

  const nftUp = async () => {
    dispatch(modalChange({ change: "loading" }));
    const nftData = {
      ...sellData,
      sellingPrice,
    };

    const { status, data } = await nftSell(nftData);
    if (status === 200) {
      alert(data);
    } else {
      alert("등록 실패!");
    }
    dispatch(modalChange({ change: "" }));
  };

  const test = async (nft) => {
    console.log(nft);
    const obj = {
      ownerAddress: nft.address,
      buyerAddress: address,
      nftId: nft.nft_name,

      tokenId: 11,
      sellingPrice: nft.selling_price,
    };
    const data = await nftBuy(obj);
    console.log(data);
  };

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      {!sellCheck ? (
        <NftExchangeBox>
          <div className="header" {...bindDivPos()}>
            NFT 거래소
          </div>
          <div className="nftMarketItemBox cc">
            {nftMarketList.map((nftData, index) => (
              <div
                className="nftMarketItem"
                onClick={() => {
                  test(nftData);
                }}
              >
                <img src={nftData.img_url} alt="" />
                <div>{nftData.selling_price}</div>
              </div>
            ))}
          </div>
          <div className="nftExlistBox">test</div>
          <div
            className="addBox cc"
            onClick={() => {
              setSellCheck(true);
            }}
          >
            <div className="buttonBox cc">등록하기</div>
          </div>
        </NftExchangeBox>
      ) : (
        <NftExchangeBox>
          <div className="header" {...bindDivPos()}>
            NFT 등록하기
          </div>
          <div className="myList">
            {myNftList.length > 0 ? (
              <div className="nftSellBox cc">
                <div className="nftItemList cc">
                  {myNftList.map((nft, index) => (
                    <NftBox
                      nft={nft}
                      index={index}
                      key={`nft${index}`}
                      setSellData={setSellData}
                      address={address}
                    />
                  ))}
                </div>
                <div className="nftSellInfo cc">
                  <div className="nftPreview cc">
                    {sellData ? (
                      <img src={sellData.imgUrl} alt="" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-question" />
                    )}
                    {sellData ? (
                      <div className="nftPreviewName">{sellData.nftName}</div>
                    ) : (
                      <div className="nftPreviewName">NFT를 선택하세요!</div>
                    )}
                  </div>
                  <div className="nftSellSetting">
                    <div>가격</div>
                    <input
                      type="number"
                      placeholder="가격을 입력하세요!"
                      value={sellingPrice}
                      onChange={(e) => {
                        setSellingPrice(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="nullList">
                <div className="nullText">등록할 수 있는 NFT가 없습니다!</div>
                <div className="nullIcon">
                  <FontAwesomeIcon icon="fa-regular fa-face-frown" />
                </div>
              </div>
            )}
          </div>
          <div className="nftSellButton cc">
            <div
              className="up cc"
              onClick={() => {
                if (sellData && sellingPrice > 0) {
                  nftUp();
                } else {
                  alert("등록할 NFT를 선택하세요!");
                }
              }}
            >
              등록
            </div>
            <div
              className="cancel cc"
              onClick={() => {
                setSellCheck(false);
              }}
            >
              취소
            </div>
          </div>
        </NftExchangeBox>
      )}
    </animated.div>
  );
};

export default NftExchange;
