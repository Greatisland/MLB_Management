import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-top: 1px solid ${props => props.theme.gray};
  background: #fff;
  a {
    display: flex;
    width: 20%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
    font-size: 0.8rem;
    font-weight: normal;
    letter-spacing: -0.02rem;
    svg {
      width: 100%;
      font-size: 1.2rem;
      fill: #333;
    }
    p {
      color: #333;
      width: 100%;
      text-align: center;
    }
    &.spot {
      background: ${props => props.theme.pink2};
      svg {
        width: 100%;
        font-size: 1.2rem;
        fill: #fff;
      }
      p {
        color: #fff;
        width: 100%;
        text-align: center;
      }
    }
  }
`