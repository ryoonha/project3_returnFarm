import styled from "styled-components";

export const BasicBox = styled.div`
  position: absolute;
  top: 130px;
  width: 500px;
  height: 250px;
  background-color: rgba(209, 209, 209, 0.9);
  border-radius: 11px;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    border-radius: 10px 10px 0px 0px;
    color: white;
    background-color: var(--headerBack);
    transition: 0.2s;
    text-align: center;

    :hover {
      background-color: rgb(109, 109, 109);
    }
  }
`;

export const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  width: 210px;
  background-color: var(--back);
  div {
    text-align: center;
    color: white;
  }
  .item {
    color: var(--itemName);
    background-color: var(--headerBack);
  }
  .desc,
  .countBox,
  .timeBox {
    padding: 5px 0px 5px 0px;
    .title {
      color: rgb(164, 214, 255);
    }
    .time0 {
      color: var(--year);
    }
    .time1 {
      color: var(--month);
    }
    .time2 {
      color: var(--Day);
    }
    .time3 {
      color: var(--hour);
    }
    .time4 {
      color: var(--minute);
    }
  }
  .countBox {
    border-top: 1px solid rgb(110, 110, 110);
    border-bottom: 1px solid rgb(110, 110, 110);
  }
`;
