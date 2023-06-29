import styled from "styled-components";

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background: #FA7462;

`

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border: 8px solid #fff;
  padding: 40px 30px;
  .loginBtn {
    padding: 10px 35px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    svg {
      font-size: 1.7rem;
      fill: #000;
    }
  }
  .eng {
    color: #fff;
  }

`