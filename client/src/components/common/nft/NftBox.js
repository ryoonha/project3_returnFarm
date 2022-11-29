import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const NftBoxContainer = styled.div`
  width: 183px;
  height: 275px;
  //border: 1px solid black;
  transition: 0.2s;
  .nft {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      /* background-color: #677467; */
      background: linear-gradient(to bottom, #e2e2b0, #6ca8ca);
      border: 1px solid rgba(51, 51, 51, 0.726);
    }
    .nftName {
      position: absolute;
      bottom: 0px;
      width: 100%;
      text-align: center;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const NftBox = ({ nft, index, setSellData, address }) => {
  const imgRef = useRef();
  const [nftData, setNftData] = useState(false);

  useEffect(() => {
    axios.get(nft[0]).then((data) => {
      setNftData(data);
    });
  }, []);

  return (
    <NftBoxContainer
      className="cc"
      onMouseMove={(e) => {
        const xCenter = e.target.offsetWidth / 2;
        const yCenter = e.target.offsetHeight / 2;
        const targetX = (xCenter - e.nativeEvent.offsetX) / 4;
        const targetY = (yCenter - e.nativeEvent.offsetY) / 4;
        imgRef.current.style.transform = `rotateX(${targetY}deg) rotateY(${targetX}deg)`;
      }}
    >
      {nftData ? (
        <div
          className="nft cc"
          onClick={(e) => {
            if (setSellData) {
              const obj = {
                tokenID: nft[1],
                address,
                nftName: nftData.data.name,
                metadataUrl: nft[0],
                imgUrl: nftData.data.image,
              };
              setSellData(obj);
            }
          }}
        >
          <img ref={imgRef} src={nftData.data.image} alt="" />
          {/* <div className="nftName">{nftData.data.name}</div> */}
        </div>
      ) : null}
    </NftBoxContainer>
  );
};

export default NftBox;
