import styled from "styled-components";

export const MemberFeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  gap: 20px;
  padding: 20px 20px 90px 20px;
  .dateResult {
    background: #E3CBCB;
    color: #333;
    /* font-weight: bold; */
    border-radius: 30px;
    padding: 5px 20px;
    span {
      color: #fff;
      padding: 0 2px;
    }
  }
`

export const PrizeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  gap: 5px;
  border-radius: 20px;
  background: #f9f9f9;
  padding: 0 0 10px 0;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  .member {
    display: flex;
    justify-content: center;
    padding: 0 10px;
    gap: 20px;
    span {
      display: flex;
      min-width: 95px;
      align-items: center;
      gap: 5px;
      text-align: center;
      line-height: 31px;
      font-size: 1rem;
      border-bottom: 1px solid #fff;
      svg {
        fill: ${props => props.theme.green};
        font-size: 1.2rem;
      }
    }
    .title {
      font-size: 0.75rem;
      font-weight: bold;
    }
  }
  p {
    font-size: 1rem;
    padding: 5px 20px;
    background: #E3CBCB;
    text-align: center;
  }
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
  background: #f9f9f9;
  padding: 0 0 20px 0;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  p {
    font-size: 1rem;
    /* font-weight: bold; */
    padding: 5px 20px;
    background: #E3CBCB;
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
      cursor: pointer;

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
      cursor: pointer;

      svg {
        border-radius: 30px;
        border: 1px solid #ccc;
        padding: 5px;
        font-size: 1rem;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }
`
interface IColor {
  state: string
}

export const CheckState = styled.li<IColor>`
  color: ${props => props.state === 'true' ? '#135E12' : '#BA3A3A'};
  font-weight: bold;
`

export const MemberFeeTotalContainer = styled.div`
  border-radius: 20px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  background: #f9f9f9;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 5px;

  ul {
    display: flex;
    justify-content: space-between;
    li {
      display: flex;
      gap: 5px;
      justify-content: center;
      flex: 1;
      color: #FC5454;
      font-size: 0.8rem;
      text-align: center;
      letter-spacing: 0.04rem;
      font-weight: bold;
      span {
        color: #555;
      }
    }
  }

  ul.title {
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3px;
      font-weight: bold;
      color: #333;
      svg {
        font-size: 1.1rem;
      }
    }
  }
`
