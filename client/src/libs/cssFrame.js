import styled from "styled-components";

export const BasicBox = styled.div`
  position: absolute;
  top: 130px;
  width: 500px;
  height: 250px;
  background-color: rgba(209, 209, 209, 0.9);

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    border-radius: 10px 10px 0px 0px;
    transform: translateY(-8px);
    color: white;
    background-color: rgb(161, 76, 76);
    transition: 0.2s;
    text-align: center;

    :hover {
      background-color: rgb(112, 16, 16);
    }
  }
`;
