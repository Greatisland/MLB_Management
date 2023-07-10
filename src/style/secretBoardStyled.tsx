import styled from "styled-components";

export const SecretBoardContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;

  .titleView {
    padding: 10px;
    border-bottom: 1px solid #999;
    font-size: 1.1rem;
  }

  .contentView {
    padding: 10px;
    letter-spacing: 0.04rem;
  }
`

export const SecretBoardBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
    /* justify-content: space-between; */
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    margin: 0 0 10px 0;
    .title {
    }
    .secretMark {
      font-size: 0.7rem;
      padding: 2px 4px;
      margin: 0 5px 0;
      display: flex;
      align-items: center;
      background: ${props => props.theme.pink};
      gap: 3px;
    }
    .date {
      margin: 0 0 0 auto;
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
  }
`

