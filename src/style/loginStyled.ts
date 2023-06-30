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
  gap: 30px;
  border: 8px solid #fff;
  padding: 40px 30px;
  .loginBtn {
    padding: 10px 35px;
    background: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    svg {
      font-size: 1.7rem;
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
    gap: 10px;
    width: 220px;
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 20px 10px;
    box-sizing: border-box;
    input[type='text'] {
      width: 100%;
      border: none;
      background: #eee;
      border-radius: 10px;
      padding: 5px 10px;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      text-align: center;
      cursor: pointer;
      font-size: 0.7rem;
    }
    input[type='password'] {
      border: none;
      background: #eee;
      border-radius: 30px;
      padding: 5px 10px;
      margin: 0 0 10px 0;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      text-align: center;
      cursor: pointer;
    }
    input[type='submit'] {
      border: none;
      background: #FFA3A3;
      border-radius: 10px;
      width: 100%;
      padding: 7px 0;
      color: #fff;
      letter-spacing: 0.04rem;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
`

export const CreateModalContainer = styled.div`
  display: flex;
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
    font-size: 0.9rem;
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