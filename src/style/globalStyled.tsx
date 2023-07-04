import styled, { createGlobalStyle } from "styled-components";

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
  align-items: center;
  gap: 10px;
  .hofTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex: 1;
    font-size: 1.1rem;
    color: #000;
    letter-spacing: 0.2rem;
  }
`

export const Btn = styled.div`
  display: flex;
  font-size: 0.8rem;
  border-radius: 30px;
  align-items: center;
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
    border-radius: 30px;
    box-sizing: border-box;
    border: none;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  }
  &.totalReview {
    display: flex;
    flex: 1;
    gap: 2px;
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
  &.memberAdd {
    margin: 0 0 0 auto;
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
`