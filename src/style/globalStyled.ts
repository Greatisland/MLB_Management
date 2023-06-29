import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`

  * {margin: 0; padding: 0; color: #333;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body, button, input, select {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .eng {
    font-family: 'Montserrat', sans-serif;
  }
`

export const BtnListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
  padding: 0 10px;
`

export const Btn = styled.div`
  display: flex;
  font-size: 0.8rem;
  border-radius: 30px;
  cursor: pointer;
  select {
    border: none;
    color: #fff;
    padding: 5px 20px;
    border-radius: 12px;
    background: #282833;
    ::-webkit-scrollbar {
        width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background: #fff;
      border-radius: 50px;
    }
    ::-webkit-scrollbar-track {
      background: #13131f;
    }
    option {
      background: #13131f;
      color: #f2f2f2;
    }
  }
  p {
    padding: 5px 20px;
    background: #282833;
    color: #fff;
    border-radius: 12px;
    box-sizing: border-box;
    border: none;
  }
  &.totalReview {
    display: flex;
    width: 100%;
    gap: 2px;
    padding: 0 0 12px;
    justify-content: center;
    align-items: center;
    span {
      display: flex;
      align-items: center;
    }
    .number {
      padding: 0 24px 0 0;
    }
  }

`

export const ScrollToTopBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  svg {
    width: 80%;
    height: 80%;
  }
`
const anim = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`
export const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: #FA7462;
  background: #FA7462;
  /* animation: ${anim} 2s ease-in-out; */
`