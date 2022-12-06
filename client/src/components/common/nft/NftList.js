import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDivMove from "../../../hooks/useDivMove";
import { animated } from "react-spring";
import { BasicBox } from "../../../libs/cssFrame";
import NftBox from "./NftBox";
import { nftMyList, nftTransfer } from "../../../api/nft";
import { useDispatch, useSelector } from "react-redux";
import { nftUpdate } from "../../../stores/reducers/userSlice";
import { modalChange } from "../../../stores/reducers/stateSlice";

const NftListBox = styled(BasicBox)`
  left: 50vw;
  top: 150px;
  width: 80vw;
  height: 350px;
  transform: translateX(-50%);

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    height: 50%; /* 스크롤바의 길이 */
    background: rgb(49, 49, 49); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(84, 155, 255, 0.1); /*스크롤바 뒷 배경 색상*/
  }

  .nfts {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .nullText {
    width: 100%;
    height: 80%;
    font-size: 30px;
  }
  .transfer {
    position: absolute;
    bottom: -10px;
    width: 100%;
    color: white;
    background-color: rgb(48, 48, 48);
    :hover {
      background-color: rgb(19, 19, 19);
    }
  }
  .transferBox {
    flex-direction: column;
    position: absolute;
    transform: translateY(100px);
    width: 100%;
    height: auto;
    border: 1px solid black;
    color: white;
    background-color: var(--back);
    .title {
      color: var(--title);
    }
    .toAddress {
      width: 400px;
      text-align: center;
      :focus {
        outline: 0px;
      }
    }
    .transferButton {
      width: 100px;
      height: 50px;
      margin: 5px 0px;
      background-color: rgb(59, 84, 139);
      cursor: pointer;
      :hover {
        background-color: rgb(32, 67, 141);
      }
    }
  }
`;

const NftList = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const [trnasSwich, setTransSwich] = useState();
  const [nftId, setNftId] = useState();
  const [toAddress, setToAddress] = useState();
  const myNftList = useSelector((state) => state.user.nft);
  const myAddress = useSelector((state) => state.user.myInfo.address);

  const myNftListCall = async () => {
    const { status, data } = await nftMyList({ fromAddress: myAddress });
    if (status === 200) {
      dispatch(nftUpdate({ nft: data }));
    }
  };

  const handleTransfer = async () => {
    dispatch(modalChange({ change: "loading" }));
    const obj = {
      // 주는 사람
      fromAddress: myAddress,
      // 받는 사람
      toAddress,
      // nft id
      tokenId: nftId,
    };
    const { status } = await nftTransfer(obj);
    if (status === 200) {
      alert("정상적으로 NFT를 전송했습니다!");
    } else {
      alert("오류가 발생했습니다!");
    }
    dispatch(modalChange({ change: "" }));
  };

  useEffect(() => {
    if (!myNftList) {
      myNftListCall();
    }
  }, [myNftList]);

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <NftListBox>
        <div className="header" {...bindDivPos()}>
          나의 NFT 목록
        </div>
        <div className="nfts">
          {myNftList.length > 0 ? (
            myNftList.map((nft, index) => (
              <NftBox
                nft={nft}
                index={index}
                key={`nft${index}`}
                setNftId={setNftId}
              />
            ))
          ) : (
            <div className="nullText cc">소유한 NFT가 없습니다!</div>
          )}
        </div>
        <div className="transfer cc" onClick={() => setTransSwich(!trnasSwich)}>
          전송하기
        </div>
        <div className="cc">
          {trnasSwich ? null : (
            <div className="transferBox cc">
              <div className="title">선택한 NFT id</div>
              <div>{nftId ? nftId : "전송할 NFT를 선택하세요"}</div>
              <div className="title">내 지갑 주소</div>
              <div>{myAddress}</div>
              <div className="title">상대 지갑 주소</div>
              <input
                className="toAddress"
                placeholder="보낼 지갑 주소를 입력하세요!"
                onChange={(e) => setToAddress(e.target.value)}
              />
              <div
                className="transferButton cc"
                onClick={() => handleTransfer()}
              >
                NFT 전송
              </div>
            </div>
          )}
        </div>
      </NftListBox>
    </animated.div>
  );
};

export default NftList;
