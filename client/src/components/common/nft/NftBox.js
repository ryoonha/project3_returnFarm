import React from "react";
import styled from "styled-components";

const NftBoxContainer = styled.div`
  width: 33.33%;
  height: 80%;
  border: 1px solid black;
  background-color: #91ca91;
  transition: 0.2s;
  .nft {
    position: relative;
    width: 90%;
    height: 90%;
    background-color: #c6ca91;
    img {
      width: 90%;
      height: 90%;
      object-fit: cover;
      //z-index: -500;
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

const NftBox = ({ nft, index }) => {
  return (
    <NftBoxContainer className="cc">
      <div
        className="nft cc"
        // onMouseMove={(e) => {
        //   console.log("---------------");
        //   console.log(e.target.offsetHeight);
        //   console.log(e.target.offsetWidth);
        //   console.log(e.nativeEvent.offsetX);
        //   console.log(e.nativeEvent.offsetY);

        //   e.target.style.transform = "rotateX(10deg) rotateZ(10deg)";
        // }}
        onMouseLeave={(e) => {
          e.target.style.transform = null;
        }}
      >
        <img
          src="/images/tokens/day.png"
          alt=""
          //   onMouseMove={(e) => {
          //     e.stopPropagation();
          //   }}
        />
        <div className="nftName">이름</div>
      </div>
    </NftBoxContainer>
  );
};

export default NftBox;
