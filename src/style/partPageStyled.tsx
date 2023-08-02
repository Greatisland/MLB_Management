import styled, { css } from "styled-components";

export const PartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 20px 20px 90px 20px;
  overflow: hidden;
`

const componentStyles = css`
  display: flex;
  overflow: hidden;
  gap: 10px;
  border-radius: 20px;
  background: #f9f9f9;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
`

export const PartAwardContainer = styled.div`
  ${componentStyles}
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #FFA3A3;
  svg {
    fill: #fff;
    font-size: 1.4rem;
  }
  .date {
    color: #fff;
  }
  .name {
    color: #fff;
    font-weight: bold;
    font-size: 1.15rem;
  }

`

export const PartResultContainer = styled.div`
  ${componentStyles}
  flex-direction: column;
  padding: 10px 20px;
  gap: 5px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      flex: 1;
      color: #666;
      font-size: 0.8rem;
      text-align: center;
      span {
        font-size: 0.7rem;
        color: #999;
      }
    }
  }

  ul.title {
    li {
      font-weight: bold;
      color: #333;
    }
  }
`

const tagStyles = css`
  font-size: 0.5rem; 
  width: 33px;
  color: #fff;
  text-align: center;
  padding: 0.05rem 0.2rem;
  border-radius: 2rem; 
`


export const PartListContainer = styled.div`
  ${componentStyles}
  flex-direction: column;
  table {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
  }
  thead {
    background: #E3CBCB;
  }
  thead, tbody, tr {
    width: 100%;
  }
  tr {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #fff;
  }
  th, td {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
    width: 25%;
    padding: 8px 0;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
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
`

export const DangerText = styled.tr`
  background: #f5eaea;
`

export const PartModalWrapper = styled.div`
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
  scrollbar-width: thin; /* 스크롤바 너비 */
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 */
    background: rgba(0, 0, 0, 0); /* 스크롤바 배경색 */
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3; /* 스크롤바 색상 */
  }
`

export const PartModalContainer = styled.div`
  width: 80%;
  max-width: 300px;
  max-height: 700px;
  overflow-y: scroll;
  scrollbar-width: thin; /* 스크롤바 너비 */
  background: #fff;
  border-radius: 30px;
  margin: auto 0;
  gap: 20px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 */
    background: rgba(0, 0, 0, 0); /* 스크롤바 배경색 */
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3; /* 스크롤바 색상 */
  }
  .chartWrap {
    height: 300px;
    border-radius: 15px;
  }

  .textArea {
    table {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      border-collapse: collapse;
    }
    thead {
      background: #E3CBCB;
    }
    thead, tbody, tr {
      width: 100%;
    }
    tr {
      display: flex;
      border-bottom: 1px solid #fff;
      padding: 0 60px 0;
      box-sizing: border-box;
    }
    th, td {
      flex: 1;
      padding: 8px 0;
      text-align: center;
      font-size: 0.85rem;
      cursor: pointer;
    }
  }

  .exit {
    border: none;
    background: #FFA3A3;
    border-radius: 30px;
    padding: 8px 10px;
    text-align: center;
    
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`

export const SearchBarPart = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;;
    height: 40px;
    padding: 10px 20px;
    font-size: 0.8rem;
    border: none;
    border-radius: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transform: scale(1.02)
    }
  }
`

export const TagExplain = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  .exp {
    font-size: 0.6rem;
    letter-spacing: -0.04rem;
    display: flex;
    gap: 2px;
    align-items: center;
  }
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
`