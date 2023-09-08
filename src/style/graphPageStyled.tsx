import styled from "styled-components";

export const GraphPageContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  gap: 30px;
  padding: 20px 20px 90px 20px;
  .notice {
    font-size: 0.6rem;
    color: #999;
    text-align: center;
  }
`

export const GraphAttendContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 20px;
  height: 300px;
  p {
    margin: 10px 0 0;
    text-align: center;
    color: #666;
    font-size: 0.8rem;
  }
`