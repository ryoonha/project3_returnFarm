import React, { useEffect } from "react";
import styled from "styled-components";
import useDivMove from "../../../hooks/useDivMove";
import { animated } from "react-spring";
import { BasicBox } from "../../../libs/cssFrame";
import NftBox from "./NftBox";
import { nftMyList, nftTransfer } from "../../../api/nft";
import { useDispatch, useSelector } from "react-redux";
import { nftUpdate } from "../../../stores/reducers/userSlice";
import RightBox from "../../modals/rightBox/RightBox";
import { handleMouse } from "../../../stores/reducers/stateSlice";

const NftListBox = styled(BasicBox)`
  left: 50vw;
  top: 150px;
  width: 80vw;
  height: 350px;
  transform: translateX(-50%);
  overflow-x: hidden;
  overflow-y: auto;

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
    /* justify-content: space-between; */
    width: 100%;
    height: 100%;
  }
  .nullText {
    width: 100%;
    height: 80%;
    font-size: 30px;
  }
`;

const NftList = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const myNftList = useSelector((state) => state.user.nft);
  const myAddress = useSelector((state) => state.user.myInfo.address);

  const myNftListCall = async () => {
    const { status, data } = await nftMyList({ fromAddress: myAddress });
    if (status === 200) {
      dispatch(nftUpdate({ nft: data }));
    }
  };

  // 선물하기 기능 여기서부터 시작
  //POST nft/transfer test!
  const handleTransfer = async () => {
    const obj = {
      // 주는 사람
      fromAddress: "0x2e11159efC28b251f5c6497FD39d6562731C252e",
      // 받는 사람
      toAddress: "0xdA001aBfbDBda64ceb98608586EAFDB2A2094736",
      // nft id
      tokenId: myNftList[0][1],
    };
    const data = await nftTransfer(obj);
    console.log(data);
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
        {myNftList.length > 0 ? (
          <div className="nfts">
            {myNftList.map((nft, index) => (
              <NftBox nft={nft} index={index} key={`nft${index}`} />
              // <RightBox
              //   nft={nft}
              //   index={index}
              //   dispatch={dispatch}
              //   handleTransfer={handleTransfer}
              // />
            ))}
          </div>
        ) : (
          <div className="nullText cc">소유한 NFT가 없습니다!</div>
        )}
      </NftListBox>
    </animated.div>
  );
};

export default NftList;
