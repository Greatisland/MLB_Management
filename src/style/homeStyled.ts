import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`
export const HomeListContainer = styled.div`
  border-radius: 30px;
  background: #f2f2f2;
  table {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
  }

  thead, tbody, tr {
    width: 100%;
  }

  tr {
    display: flex;
    justify-content: space-around;
  }

  th, td {
    width: 25%;
    padding: 8px;
    text-align: center;
  }
`