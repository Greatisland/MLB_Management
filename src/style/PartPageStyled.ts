import styled, { css } from "styled-components";

export const PartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 20px 20px 90px 20px;
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
      color: #777;
      font-size: 0.8rem;
      text-align: center;
    }
  }

  ul.title {
    li {
      font-weight: bold;
      color: #333;
    }
  }
`

export const PartListContainer = styled.div`
  ${componentStyles}
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
    width: 25%;
    padding: 8px 0;
    text-align: center;
    font-size: 0.85rem;
    cursor: pointer;
  }
`