import styled from "styled-components";

export const BasicBox = styled.div`
  position: absolute;
  top: 130px;
  width: 500px;
  height: 250px;
  background-color: #fff5d4;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    border-radius: 10px 10px 0px 0px;
    transform: translateY(-8px);
    background-color: rgb(65, 141, 255);
    text-align: center;

    :hover {
      background-color: rgb(255, 115, 115);
    }
  }
`;
