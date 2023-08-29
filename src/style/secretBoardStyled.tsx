import styled from "styled-components";

export const SecretBoardContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
  .notice {
    font-size: 0.6rem;
  }
  .titleView {
    padding: 10px;
    border-bottom: 1px solid #999;
    font-size: 1.1rem;
  }

  .contentView {
    padding: 10px;
    letter-spacing: 0.04rem;
    min-height: 20vh;
    white-space: pre-wrap;
  }
`

export const SecretBoardBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  button {
    border: none;
    background: none;
  }
  .checkText {
    margin: 0 0 0 10px;
  }
`

export const SecretBoardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .list {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    margin: 0 0 10px 0;
    cursor: pointer;
    .title {
      flex: 1;
      white-space: nowrap;  
      overflow: hidden;   
      text-overflow: ellipsis;
      margin: 0 10px 0;
      font-size: 0.9rem;
      letter-spacing: -0.04rem;
    }
    .commentAmount, .viewAmount {
      display: flex;
      align-items: center;
      gap: 0.5px;
      font-size: 0.8rem;
      color: #666;
      svg {
        fill: #666;
      }
    }
    .commentAmount {
      margin: 0 5px 0 0;
    }
    .secretName {
      font-size: 0.6rem;
      color: #868686;
      padding: 2px 4px;
      gap: 3px;
    }
    .secretMark {
      font-size: 0.7rem;
      padding: 2px 4px;
      margin: 0 5px 0 0;
      display: flex;
      align-items: center;
      background: ${props => props.theme.pink};
      gap: 3px;
    }
    .date {
      margin: 0 0 0 20px;
      font-size: 0.8rem;
    }
  }
`

export const SecretBoardWriteContainer = styled.div`
  

`

const cssArea = `
  display: block;
  padding: 10px 20px;
  width: calc(100% - 40px);
  background: #f9f9f9;
  border: none;
  letter-spacing: 0.06em;
  border-radius: 6px;
  :focus {
    outline: none;
  }
`
export const EditorContainer = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 0;
  gap: 20px;
  .notice {
    font-size: 0.6rem;
    letter-spacing: -0.04rem;
  }
  .titleArea {
    ${cssArea}
  }
  .contentArea {
    ${cssArea}
    min-height: 60vh;
    resize: none;
    line-height: 25px;
    white-space: pre-wrap;
  }
`

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const CommentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  .name {
    width: 50%;
    font-size: 0.8rem;
    .secretName {
      font-size: 0.6rem;
      color: #868686;
    }
  }
  .date {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    font-size: 0.7rem;
  }
  .content {
    border-top: 1px solid #ccc;
    padding: 10px 0 0;
    flex: 1;
    font-size: 0.9rem;
    white-space: pre-wrap;
  }
`

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

export const ViewUserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  gap: 10px;
  border-radius: 20px;
  background: #f9f9f9;
  padding: 5px 10px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  span {
    color: #333;
    font-size: 0.6rem;
  }
`