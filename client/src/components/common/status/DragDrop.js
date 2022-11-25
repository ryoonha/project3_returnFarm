import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { userUpdatePfp } from "../../../api/user";
import { modalChange } from "../../../stores/reducers/stateSlice";
import { myInfoSave } from "../../../stores/reducers/userSlice";

const DragDropBox = styled.div`
  width: 150px;
  height: 165px;
  /* min-height: 180px; */

  .dragdrop {
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #daffe5;
    object-fit: contain;
  }

  .ddt {
    transform: translateY(-180px);
    opacity: 0;
  }

  .fileInfo {
    position: relative;
    width: 100%;
    height: 30px;
    background-color: rgb(235, 246, 255);
    .close {
      position: absolute;
      width: 20px;
      height: 20px;
      right: 0px;
      border: 2px solid #ff7676;
      border-radius: 50%;
      line-height: 20px;
      background-color: #ffdada;
      transition: 0.2s;
      cursor: pointer;

      :hover {
        background-color: #ff7676;
      }
    }
  }
`;

const DragDrop = ({ address, profileImg }) => {
  const dragRef = useRef(null);
  const dispatch = useDispatch();

  const onChangeFiles = useCallback(async (e) => {
    dispatch(modalChange({ change: "loading" }));
    let selectFiles = null;

    if (e.type === "drop") {
      selectFiles = e.dataTransfer.files;
    } else {
      selectFiles = e.target.files;
    }

    const handleChangeFile = async (file) => {
      const reader = new FileReader();
      if (file && file.size < 50000) {
        reader.readAsDataURL(file); // URL get
        return new Promise((resolve) => {
          reader.onload = () => {
            userUpdatePfp({ address: address, image: reader.result });
            dispatch(myInfoSave({ data: { user_pfp: reader.result } }));
            resolve();
            dispatch(modalChange({ change: "" }));
          };
        });
      } else {
        alert("실패! 파일 크기가 50KB를 넘습니다!");
      }
      dispatch(modalChange({ change: "" }));
    };
    handleChangeFile(selectFiles[0]);
  }, []);

  const dragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const drop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", dragIn);
      dragRef.current.addEventListener("dragleave", dragOut);
      dragRef.current.addEventListener("dragover", dragOver);
      dragRef.current.addEventListener("drop", drop);
    }
  }, [dragIn, dragOut, dragOver, drop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", dragIn);
      dragRef.current.removeEventListener("dragleave", dragOut);
      dragRef.current.removeEventListener("dragover", dragOver);
      dragRef.current.removeEventListener("drop", drop);
    }
  }, [dragIn, dragOut, dragOver, drop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <DragDropBox>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={true}
        onChange={onChangeFiles}
      />

      <label htmlFor="fileUpload" ref={dragRef}>
        <img src={profileImg} alt="" className="dragdrop " />
        {/* 사진 변경 API 연결 */}
        <div className="dragdrop ddt cc">사진 변경</div>
      </label>
    </DragDropBox>
  );
};

export default DragDrop;
