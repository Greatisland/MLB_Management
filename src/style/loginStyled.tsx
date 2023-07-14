import styled from "styled-components";

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  background: #FA7462;

`

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 30px;
  border: 8px solid #fff;
  padding: 40px 15px;
  box-sizing: border-box;
  .loginBtn {
    width: 100%;
    padding: 10px 35px;
    box-sizing: border-box;
    background: #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    svg {
      font-size: 1.4rem;
    }

  }

  .guestBtn {
    svg {
      fill: #4169e1;
    }
  }
  .joinBtn {
    svg {
      fill: #b8860b;
    }
  }
  .eng {
    color: #fff;
  }
  .loginForm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 20px 10px;
    box-sizing: border-box;
    .reset {
      flex: 1;
      color: #fff;
      background: ${props => props.theme.brown};
      border-radius: 10px;
      padding: 5px 10px;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      text-align: center;
      cursor: pointer;
      font-size: 0.7rem;
    }
    input[type='text'] {
      width: 100%;
      border: none;
      background: #eee;
      border-radius: 10px;
      padding: 10px 10px;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      text-align: center;
      cursor: pointer;
      font-size: 0.7rem;
    }
    input[type='password'] {
      width: 100%;
      border: none;
      background: #eee;
      border-radius: 10px;
      padding: 10px 10px;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      text-align: center;
      cursor: pointer;
      font-size: 0.7rem;
    }
    input[type='submit'] {
      border: none;
      background: ${props => props.theme.green};
      border-radius: 10px;
      width: 100%;
      padding: 10px 0;
      margin: 10px 0 0;
      color: #fff;
      font-size: 1.1rem;
      letter-spacing: 0.08rem;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
`

export const CreateModalContainer = styled.div`
  display: flex;
  width: 80%;
  max-width: 500px;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 20px;
  border-radius: 30px;
  gap: 20px;
  padding: 40px 30px;
  box-sizing: border-box;
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  input[type='text'] {
    border: none;
    background: #eee;
    border-radius: 30px;
    padding: 5px 10px;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    text-align: center;
    cursor: pointer;
    font-size: 0.8rem;
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
  .exit {
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
`