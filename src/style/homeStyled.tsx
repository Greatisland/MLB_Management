import styled, { css } from "styled-components";
import { FaCrown, FaStar } from 'react-icons/fa';
import { GiTrophy } from 'react-icons/gi'

export const HomeContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
  .wait {
    display: flex;
    width: 100%;
    height: 100vh;
    font-size: 0.8rem;
    line-height: 1.67rem;
    gap: 30px;
    padding: 40px 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    form {
      display: flex;
      flex-wrap: wrap;
      p {
        width: 100%;
      }
      justify-content: center;
      align-items: center;
      gap: 20px;
    }

    input[type='text'] {
      border: none;
      background: #f9f9f9;
      border-radius: 30px;
      padding: 5px 10px !important;
      text-align: center !important;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    
    input[type='submit'] {
      border: none;
      background: #FF9CC7;
      border-radius: 30px;
      padding: 8px 20px !important;
      color: #fff;
      letter-spacing: 0.04rem;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }

    .notice {
      width: 100%;
    }
  }
`
interface TabProps {
  isTab?: boolean
}

export const TabBtnContainer = styled.div<TabProps>`
  display: flex;
  justify-content: center;
  gap: 20px;
`

export const TabBtn = styled.div<TabProps>`
  padding: 0 20px 2px 20px;
  border: none;
  border-bottom: ${props => props.isTab ? `2px solid #FF9CC7` : '2px solid transparent'};
  background-color: transparent;
  font-weight: ${props => props.isTab ? 
    'bold' : 'normal'
  };
  color: ${props => props.isTab ? 
    props.theme.pink2
  : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;
  letter-spacing: 0.1rem;
`

const svgStyles = css`
  font-size: 0.7rem;
`

interface SvgProps {
  bgColor: string
}

const tagStyles = css`
  font-size: 0.5rem; 
  width: 33px;
  color: #fff;
  text-align: center;
  padding: 0.05rem 0.2rem;
  border-radius: 2rem; 
`

export const StyledFaCrown = styled(FaCrown)<SvgProps>`
  ${svgStyles}
  fill: ${props => props.bgColor};
`

export const StyledFaStar = styled(FaStar)<SvgProps>`
  ${svgStyles}
  fill: ${props => props.bgColor};
  &.iconExp {
    margin: 0 10px 0 0;
  }
`

export const StyledGiTrophy = styled(GiTrophy)<SvgProps>`
  ${svgStyles}
  fill: ${props => props.bgColor};
`

export const HomeListContainer = styled.div`
  border-radius: 30px;
  margin: 0 0 20px;
  background: ${props => props.theme.white2};
  overflow: hidden;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  table {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
  }
  thead {
    background: ${props => props.theme.pink};
  }
  thead, tbody, tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #fff;
  }
  td.index {
    font-size: 0.6rem;
  }

  th, td {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
    width: 25%;
    padding: 8px 0;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
    &.index {
    width: 10%;

    }
    .tagContainer {
      max-width: 31px;
      gap: 2px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .tagHot {
        ${tagStyles}
        background: ${props => props.theme.pink3};
      }
      .tagNew {
        ${tagStyles}
        background: ${props => props.theme.green};
      }
      .tagBack {
        ${tagStyles} 
        background: ${props => props.theme.brown};
      }
      .tagDanger {
        ${tagStyles}
        color: #b22222; 
        background: #ffffff; 
      }
    }
  }
  th:first-child, td:first-child {
    width: 32%;
  }
  .tdmemo {
    text-align: start;
    font-size: 0.7rem;
    letter-spacing: -0.01rem;
    color: ${props => props.theme.green};
  }
  .date {
    letter-spacing: -0.04rem;
  }
  .etc {
    color: ${props => props.theme.green};
  }
  .pendding {
    width: 100%;
  }
  .delete {
    svg {
      font-size: 1rem;
    }
    font-size: 0.7rem;
  }
`

export const BanTopContainer = styled.div`
  display: flex;
  div {
    margin: 0 0 0 auto;
  }
`

export const CheckBirthContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 20px;
  font-size: 0.8rem;
  background: ${props => props.theme.green};
  color: #fff;
  cursor: pointer;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  svg {
    font-size: 1rem;
    fill: #fff;
  }
`

export const BirthAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  max-width: 400px!important;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 20px;
  font-size: 0.8rem;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  form {
    p {
      width: 100%;
      text-align: center;
    }
    .notice {
      span {
        display: block;
        font-weight: bold;
        margin: 0 0 5px 0;
      }
      font-size: 0.7rem;
      color: #666;
    }
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 10px;
    justify-content: center;
    input[type='text'] {
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: white;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      padding: 5px;
      box-sizing: border-box;
    }

    .button {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 20px 0 0 0;
      input, .cancle {
        padding: 5px 20px;
        border-radius: 24px;
        border: none;
        color: #fff;
        background-color: ${props => props.theme.pink2};
        font-size: 1rem;
        cursor: pointer;
        transition: 0.3s;

        &:hover {
          background-color: #e7e7e7;
          color: #333;
        }
      }
    }
  }
`

export const SelectBox = styled.select`
  padding: 2px 4px;
  text-align: center;
  /* font-size: 16px; */
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none; /* 기본 select 스타일 제거 */
  background-color: #f8f8f8;
  cursor: pointer;
`