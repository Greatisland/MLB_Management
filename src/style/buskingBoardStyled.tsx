import styled from "styled-components";

export const BuskingBoardContainer = styled.div`
  padding: 20px;
  overflow: hidden;
`

export const BuskingModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  overflow-y: auto;
  z-index: 101;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 3px;
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3;
  }
`;

export const BuskingModalContainer = styled.div`
  width: 80%;
  max-width: 400px;
  max-height: 600px;
  background: #fff;
  border-radius: 30px;
  gap: 20px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  margin: auto 0;

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  p {
    font-weight: bold;
  }

  input[type='text'], input[type='number'], input[type='date'], textarea {
    border: none;
    background: #f9f9f9;
    border-radius: 30px;
    padding: 10px 20px;
    text-align: center;
    margin: 0 0 10px 0;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  input[type='date'] {
    position: relative;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent; // 배경은 투명하게,
    color: transparent; // 글자도 투명하게! 이 두 설정을 통해 캘린더 아이콘을 사라지게 만든다.
    cursor: pointer;
  } 

  textarea {
    resize: none;
    min-height: 100px;
    text-align: left;
  }

  input[type='submit'] {
    border: none;
    background: #FF9CC7;
    border-radius: 30px;
    padding: 8px 10px;
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin: 20px 0 0;
  }

  .btnWrapper {
    display: flex;
    justify-content: space-around;
    gap: 20px;

    .cancel {
      flex: 1;
      border: none;
      background: #FFA3A3;
      border-radius: 30px;
      padding: 8px 10px;
      color: #fff;
      letter-spacing: 0.04rem;
      text-align: center;
      font-size: 0.8rem;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
`;

export const BuskingNoticeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  background: ${props => props.theme.pink2};
  /* background: #ffeaea; */
  border: 1px solid #f2f2f2;
  padding: 14px;
  border-radius: 20px;
  svg {
    font-size: 1.6rem;
    fill: #fff;
  }
`
export const BuskingNoticeModalContainer = styled.div`
  width: 80%;
  max-width: 400px;
  background: #fff;
  border-radius: 30px;
  gap: 20px;
  padding: 20px;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    width: 80%;
    min-height: 400px;
    resize: none;
    padding: 4px;
    border: none;
    white-space: pre-wrap;
  }
  div {
    
  }
  
`

export const BuskingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const BuskingCard = styled.div<{end: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* background: ${props => props.theme.pink2}; */
  background: ${props => props.end ? '#f2f2f2' : '#fff'};
  border: 1px solid #ddd;
  padding: 14px;
  border-radius: 20px;

  .head {
    display: flex;
    align-items: center;
    h3 {
      font-size: 1.5rem;
      color: #333;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 5px;
    }
    .participants {

    }
    .user {
      min-width: 3rem;
      color: #333;
      text-align: right;
      font-weight: bold;
      font-size: 0.8rem;
      margin-left: auto;
    }
  }

  .content {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .info {
    display: flex;
    gap: 10px;
    span {
      font-size: 0.8rem;
      color: #333;
      /* background: #615e60; */
      border: 1px solid #bbb;
      padding: 2px 12px;
      border-radius: 20px;
    }
  }
`

export const BuskingAddBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  /* background: ${props => props.theme.brown}; */
  background: rgba(255,255,255,0.9);
  padding: 4px 30px 4px 30px;
  border: 1px solid #666;
  border-radius: 20px;
  position: fixed;
  z-index: 100;
  bottom: 80px;
  left: 30px;
  svg {
    font-size: 2rem;
    fill: #333;
  }
  span {
    color: #333;
    font-size: 0.9rem;
    font-weight: bold;
  }
`

export const BuskingViewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  .title {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: 0 0 20px 0;
    h2 {
      width: 100%;
      font-size: 2rem;
      margin-right: auto;
    }
  }
`;

export const BuskingTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 2rem;
  /* border-bottom: 1px solid #ccc; */
  margin-bottom: 10px;
  .viewCount {
    margin: 0 0 0 auto;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    color: #888;
    svg {
      font-size: 1.4rem;
    }
  }
`;

export const BuskingInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  color: #888;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  p {
    font-weight: bold;
    margin: 0 20px 0 0;
    span {
      font-weight: normal;
      font-size: 0.8rem;
      padding: 2px 8px;
      border: 1px solid #ccc;
      border-radius: 20px;
    }
  }
`;

export const BuskingBar = styled.div<{ percentage: number }>`
  width: 100%;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 0 0 20px 0;
  .fill {
    width: ${(props) => props.percentage}%;
    height: 100%;
    background: linear-gradient(45deg, #ffaf7b, #ff7eb3);
    transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border-radius: 15px;
    position: relative;

  /* &::after { */
    /* content: "${(props) => props.percentage}%"; */
    span {
      position: absolute;
      top: 50%;
      right: ${(props) => props.percentage > 13 ? '10px' : '-50px'};
      color: ${(props) => props.percentage > 13 ? '#fff' : '#e97575'};
      transform: translateY(-50%);
      font-size: 0.9rem;
      font-weight: bold;
      letter-spacing: 0.2rem;
      &.percent {
        letter-spacing: -0.02rem;
      }
    }
    
  }

`

export const BuskingParticipantsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0 0 20px 0;
  P {
    font-size: 0.9rem;
    font-weight: bold;
    width: 100%;
  }
  span {
    font-size: 0.8rem;
    padding: 2px 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
  }
`

export const BuskingVote = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  align-items: center;
  margin-bottom: 20px;
  div {
    text-align: center;
    padding: 4px 20px;
    border-radius: 20px;
    background: #e7b3b3;
    color: #fff;
  }
`;

export const BuskingContent = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
`;

export const CommentSection = styled.div`
  margin-top: 40px;
  h3 {
    display: flex;
    align-items: center;
    gap: 2px;
    margin: 0 0 20px 0;
    svg {
      font-size: 0.9rem;

    }
  }
`;

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const CommentItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

export const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.8rem;
  color: #888;
  .name {
    font-size: 1rem;
    display: flex;
    gap: 5px;
    align-items: center;
    font-weight: bold;
  }
`;

export const CommentForm = styled.form`
 margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 20px 0;
  button {
    border: none;
    background: none;
  }
  input {
    width: 80%;
    border: none;
    padding: 4px;
    border-bottom: 1px solid #ccc;
  }
  textarea {
    width: 80%;
    min-height: 50px;
    resize: none;
    padding: 4px;
    border: 1px solid #ccc;
    white-space: pre-wrap;
  }
`