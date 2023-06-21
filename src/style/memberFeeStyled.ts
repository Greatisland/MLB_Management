import styled from "styled-components";

export const MemberFeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
`

export const MemberFeeListContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`

export const MembersTarget = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  gap: 10px;
  border-radius: 20px;
  background: #f2f2f2;
  padding: 0 0 20px 0;
  p {
    font-size: 1rem;
    font-weight: bold;
    padding: 5px 20px;
    background: #ddd;
    text-align: center;
  }
  ul.title {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    li {
      width: 35%;
      text-align: center;
      padding: 5px 0;
      font-weight: bold;
      font-size: 1rem;
      border-bottom: 1px solid #fff;
    }
    .lastBtn {
      width: auto;
      flex: 1;
    }
  }
  .member {
    display: flex;
    ul {
      width: 70%;
      display: flex;
      li {
        width: 50%;
        text-align: center;
        line-height: 31px;
        font-size: 0.75rem;
        border-bottom: 1px solid #fff;
      }
    }
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      svg {
        border-radius: 30px;
        border: 1px solid #ccc;
        padding: 5px;
        font-size: 1rem;
      }
    }

  }
`

