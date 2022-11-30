import React, { useEffect } from "react";
import styled from "styled-components";
import useDivMove from "../../../hooks/useDivMove";
import { animated } from "react-spring";
import { BasicBox } from "../../../libs/cssFrame";
import NftBox from "./NftBox";
import {
  nftExchange,
  nftIpExchange,
  nftMyList,
  nftTransfer,
} from "../../../api/nft";
import { useDispatch, useSelector } from "react-redux";
import { nftUpdate } from "../../../stores/reducers/userSlice";

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
  const nftList = useSelector((state) => state.user.nft);
  const myAddress = useSelector((state) => state.user.myInfo.address);

  const myNftListCall = async () => {
    const { status, data } = await nftMyList({ fromAddress: myAddress });
    if (status === 200) {
      dispatch(nftUpdate({ nft: data }));
    }
  };

  useEffect(() => {
    if (!nftList) {
      myNftListCall();
    }
  }, [nftList]);

  //POST nft/transfer test!
  const testFun = async () => {
    const obj = {
      // 주는 사람
      fromAddress: "0x2e11159efC28b251f5c6497FD39d6562731C252e",
      // 받는 사람
      toAddress: "0xdA001aBfbDBda64ceb98608586EAFDB2A2094736",
      // nft id
      tokenId: nftList[0][1],
    };
    const data = await nftTransfer(obj);
    console.log(data);
  };

  //nftExchange test
  //nftIpExchange test
  const testFun2 = async () => {
    console.log("실행");
    const obj = {
      address: myAddress,
      amount: 1,
    };
    const data = await nftIpExchange(obj);
    console.log(data);
  };

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
        {nftList.length > 0 ? (
          <div className="nfts">
            {nftList.map((nft, index) => (
              <NftBox nft={nft} index={index} key={`nft${index}`} />
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
