import styled from "styled-components";

export const BuskingBoardContainer = styled.div`

`



export const BuskingModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  overflow-y: auto;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 3px;
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3;
  }
`;

export const BuskingModalContainer = styled.div`
  width: 80%;
  max-width: 400px;
  max-height: 600px;
  background: #fff;
  border-radius: 30px;
  gap: 20px;
  padding: 40px 20px 70px 20px;
  display: flex;
  flex-direction: column;
  margin: auto 0;

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  p {
    font-weight: bold;
  }

  input[type='text'], input[type='number'], input[type='date'], textarea {
    border: none;
    background: #f9f9f9;
    border-radius: 30px;
    padding: 10px 20px;
    text-align: center;
    margin: 0 0 10px 0;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  textarea {
    resize: none;
    min-height: 100px;
    text-align: left;
  }

  input[type='submit'] {
    border: none;
    background: #FF9CC7;
    border-radius: 30px;
    padding: 8px 10px;
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin: 20px 0 0;
  }

  .btnWrapper {
    display: flex;
    justify-content: space-around;
    gap: 20px;

    .cancel {
      flex: 1;
      border: none;
      background: #FFA3A3;
      border-radius: 30px;
      padding: 8px 10px;
      color: #fff;
      letter-spacing: 0.04rem;
      text-align: center;
      font-size: 0.8rem;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
`;