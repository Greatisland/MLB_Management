import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
`
export const HomeListContainer = styled.div`
  border-radius: 30px;
  background: #f2f2f2;
  overflow: hidden;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
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
  .date {
    letter-spacing: -0.04rem;
  }
  .etc {
    color: #199E98;
  }
`