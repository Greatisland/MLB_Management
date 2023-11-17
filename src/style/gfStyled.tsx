import styled from 'styled-components';

export const ChatWindow = styled.div`
  min-height: 80vh;
  height: 100%;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  .notice {
    text-align: center;
    font-size: 0.7rem;
    color: #999;  
    padding: 10px 0;
  }
  &::after {
    display: block;
    content: '';
    width: 100%;
    height: 120px;
  }
`;

export const Message = styled.div<{ isai: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.isai ? 'flex-start' : 'flex-end')};
  max-width: 70%;

  span {
    display: flex;
    gap: 10px;
    font-size: 0.8rem;
    align-items: center;
    .icon {
      display: block;
      width: 50px; 
      height: 50px;
      background: url('/grandFather.png') center center/cover;
      border-radius: 50%;
    }
  }
  p.content {
    background-color: ${(props) => (props.isai ? '#f1f1f1' : '#daf1ff')};
    color: ${(props) => (props.isai ? '#333' : props.theme.gray2)};
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 10px;
  }
`;

export const ChatForm = styled.form`
  position: fixed;
  width: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-top: 1px solid #ccc;
  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-right: 10px;
  }
  button {
    padding: 8px 12px;
    background-color: ${props => props.theme.pink2};
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }
  circle {
    color: ${props => props.theme.pink2};
  }
  .notice {
    text-align: center;
    line-height: 30px;
    font-size: 0.7rem;
    color: #999;  
    padding: 0 0 0 10px;
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 70px;
  }
`;