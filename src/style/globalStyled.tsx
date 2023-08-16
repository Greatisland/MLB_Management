import styled, { createGlobalStyle} from "styled-components";
export const GlobalStyle = createGlobalStyle`

  * {margin: 0; padding: 0; color: #333;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body {
    scrollbar-width: thin; /* 스크롤바 너비 */
    &::-webkit-scrollbar {
      width: 3px; /* 스크롤바 너비 */
      background: rgba(0, 0, 0, 0); /* 스크롤바 배경색 */
    }
    &::-webkit-scrollbar-thumb {
      background: #FFA3A3; /* 스크롤바 색상 */
    }
  }
  html, body, button, input, select {
    font-family: 'Noto Sans KR', sans-serif;
  }
  input, textarea {
    appearance: none;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none; 
    appearance: none;
  }
  .no-scroll {
    overflow: hidden;
    height: 100%;
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
  .fee {
    width: 30%;
    display: flex;
    justify-content: center;
    p {
      width: 100%;
      max-width: 130px;
      text-align: center;
    }
  }
  .hofTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    flex: 1;
    font-size: 1.4rem;
    background: #181717;
    padding: 8px;
    color: ${props => props.theme.brown};
    letter-spacing: 0.2rem;
    border-radius: 12px;
    border-top: 2px solid ${props => props.theme.brown};
    border-bottom: 2px solid ${props => props.theme.brown};
    svg {
      fill: ${props => props.theme.brown};
    }
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
    background: ${props => props.theme.gray2};
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
    background: ${props => props.theme.gray2};
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
  #check {
    width: 20px; height: 20px;
    border: 1px solid #333;
    appearance: auto;
    -webkit-appearance: auto;
  }
`

export const ScrollToTopBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: fixed;
  z-index: 99;
  background: #fff;
  bottom: 100px;
  right: 20px;
  svg {
    width: 70%;
    height: 70%;
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
  background: ${props => props.theme.pink2};
`