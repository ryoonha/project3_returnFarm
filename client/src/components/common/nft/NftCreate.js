import React, { useState } from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import useDivMove from "../../../hooks/useDivMove";
import { BasicBox } from "../../../libs/cssFrame";
import { nftCreate, nftMyList } from "../../../api/nft";
import { useDispatch, useSelector } from "react-redux";
import { modalChange } from "../../../stores/reducers/stateSlice";
import { nftUpdate } from "../../../stores/reducers/userSlice";

const NftCreateBox = styled(BasicBox)`
  display: flex;
  flex-direction: column;
  left: 50vw;
  transform: translateX(-50%);
  width: 700px;
  height: 450px;
  background-color: var(--back);

  .imgBox {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid rgb(199, 199, 199);
      object-fit: contain;
    }

    .fileInputBox {
      width: 100%;
      height: 100%;
      label {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border: 1px solid gray;
        color: #fff;
        vertical-align: middle;
        background-color: rgb(90, 90, 90);
        font-size: 30px;
        cursor: pointer;

        :hover {
          background-color: rgb(71, 71, 71);
        }
      }
    }
  }
  .descBox {
    flex-direction: column;
    margin-top: 50px;
    div {
      margin-bottom: 5px;
      color: var(--title);
    }
    div:last-child {
      margin: 0px;
      color: rgb(255, 92, 92);
      font-size: 12px;
    }
    input {
      text-align: center;
    }
  }
  .mintingBox {
    margin-top: 50px;
    div {
      width: 100px;
      height: 50px;
      color: white;
      background-color: rgb(90, 90, 90);
      border: 1px solid rgb(175, 175, 175);
      cursor: pointer;

      :hover {
        background-color: rgb(58, 58, 58);
      }
    }
  }
`;

const NftCreate = () => {
  const dispatch = useDispatch();
  const [x, y, bindDivPos] = useDivMove();
  const [img, setImg] = useState({
    preview: false,
    imgData: false,
  });
  const [desc, setDesc] = useState();
  const { address, nickName, ip_amount } = useSelector(
    (state) => state.user.myInfo
  );

  const handleCreate = async () => {
    dispatch(modalChange({ change: "loading" }));
    const formData = new FormData();
    formData.append("address", address);
    formData.append("name", nickName);
    formData.append("description", desc);
    formData.append("file", img.imgData);

    const data = await nftCreate(formData);
    if (data.status === 200) {
      const myNftList = await nftMyList(address);
      if (myNftList.status === 200) {
        dispatch(nftUpdate({ nft: myNftList.data }));
      }
    }
    dispatch(modalChange({ change: "" }));
  };

  const previewImg = (file) => {
    if (file.length) {
      const reader = new FileReader();
      reader.readAsDataURL(file[0]); // URL get
      return new Promise((resolve) => {
        reader.onload = () => {
          setImg({ ...img, imgData: file[0], preview: reader.result });
          resolve();
        };
      });
    }
  };

  return (
    <animated.div
      style={{
        x,
        y,
      }}
    >
      <NftCreateBox>
        <div className="header" {...bindDivPos()}>
          NFT 생성
        </div>
        <div className="imgBox cc">
          {img.preview ? (
            <img
              src={img.preview}
              alt=""
              onClick={() => setImg({ ...img, preview: false })}
            />
          ) : (
            <div className="fileInputBox cc">
              <label htmlFor="file">이미지 찾기</label>
              <input
                type="file"
                id="file"
                onChange={(e) => previewImg(e.target.files)}
              />
            </div>
          )}
        </div>
        <div className="descBox cc">
          <div>NFT 설명</div>
          <input
            type="text"
            placeholder="설명을 입력하세요!"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div>NFT 민팅은 평균 50초 소요 됩니다!</div>
        </div>
        <div className="mintingBox cc">
          <div
            className="cc"
            onClick={() => {
              if (ip_amount >= 1) {
                handleCreate();
              } else {
                dispatch(modalChange({ change: "error/ip" }));
              }
            }}
          >
            민팅
          </div>
        </div>
      </NftCreateBox>
    </animated.div>
  );
};

export default NftCreate;
