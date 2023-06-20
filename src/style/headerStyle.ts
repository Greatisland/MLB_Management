import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 20px;
  h1 {
    padding: 20px 0 0;
    font-size: 1.5rem;
    color: #0B4240;
    font-weight: bold;
  }
`
export const  JoinModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const  JoinModalContainer = styled.div`
  width: 80%;
  height: 80%;
  background: #fff;
`