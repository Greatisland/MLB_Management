import styled from "styled-components";
interface HeaderContainerProps {
  $photourl: string | null
}
export const HeaderContainer = styled.div<HeaderContainerProps>`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  padding: 0 20px;
  gap: 12px;
  h1 {
    width: 100%;
    padding: 20px 0 0;
    font-size: 1.5rem;
    color: #0B4240;
    font-weight: normal;
    letter-spacing: 0.2rem;
  }
  .btns {
    display: flex;
    align-items: center;
    gap: 10px;
    .photo {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: #333 url(${props => props.$photourl ? props.$photourl : ''}) center center/cover;
    }
    .hi {
      font-size: 0.8rem;
    }
    .logout {
      margin: 0 0 0 auto;
      border: none;
      background: #FFA3A3;
      border-radius: 30px;
      font-size: 0.8rem;
      padding: 5px 20px;
      color: #fff;
      box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
  .login {
    margin: 0 0 0 auto;
    border: none;
    background: #FFA3A3;
    border-radius: 30px;
    font-size: 0.8rem;
    padding: 5px 20px;
    color: #fff;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`
export const  JoinModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  overflow-y: auto;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  scrollbar-width: thin; /* 스크롤바 너비 */
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 */
    background: rgba(0, 0, 0, 0); /* 스크롤바 배경색 */
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3; /* 스크롤바 색상 */
  }
`

export const  JoinModalContainer = styled.div`
  width: 80%;
  max-width: 300px;
  max-height: 1000px;
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
    display: inline-block;
    font-weight: bold;
  }

  input {
    height: 27px;
    flex: 1;
    text-align: center !important;
  }

  select {
    display: block;
    height: 27px;
    text-align: center !important;
    text-align-last:center;
    text-align:center;
    -moz-text-align-last:center;
  }


  input[type='text'], .awardCount, .birth {
    border: none;
    background: #f9f9f9;
    border-radius: 30px;
    padding: 5px 10px !important;
    text-align: center !important;
    margin: 0 0 10px 0;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .awardCount, .birth {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.8rem;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    gap: 10px;
  }
  .awardTitle {
    display: flex;
    align-items: center;
    gap: 10px;
    .detail {
      font-size: 0.7rem;
      svg {
        font-size: 1rem;
      }
    }
  }
  .awardCount {
    background: #fff;
    border: 1px solid #bb8900;
    svg {
      font-size: 2.2rem;
    }
  }


  input[type='date'] {
    border: none; 
    position: relative;
    padding: 5px 10px !important;
    background: #f9f9f9;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    font-size: 0.8rem;
    margin: 0 0 10px 0;
  }

    // 이 영역을 확장해서 input의 어떤 곳을 클릭해도 캘린더를 클릭한 것과 같은 효과를 만들자!
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

  input[type='submit'], .submit {
    border: none;
    background: #FF9CC7;
    border-radius: 30px;
    padding: 8px 10px !important;
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    /* margin: 40px 0 0; */
  }

  select {
    flex: 1;
    width: 100%;
    border: none;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    padding: 4px !important;
    border-radius: 12px;
    background: #f9f9f9;
    text-align: center;
    margin: 0 0 10px 0;
    cursor: pointer;
    ::-webkit-scrollbar {
        width: 15px;
    }
    ::-webkit-scrollbar-thumb {
      background: #fff;
      border-radius: 50px;
    }
    ::-webkit-scrollbar-track {
      background: #13131f;
    }
    option {
      background: #f9f9f9;
      color: #333;
    }
  }
  .btnWrapper {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    .delete, .cancle {
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
  .checkFlex {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0;
    gap: 10px;

    span.return_date {
      display: block;
      width: 100%;
      font-size: 0.8rem;
      color: #999;
    }
  }

  .extraBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0 10px 0;
    gap: 10px;
    font-size: 0.8rem;
    cursor: pointer;
    svg {
      font-size: 1.2rem;
      fill: ${props => props.theme.brown};
      fill: #333;
      /* background: ${props => props.theme.pink}; */
      /* border-radius: 50%; */
    }
  }
`

export const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

export const StyledCheckbox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #f6f6f6;
  border: 2px solid #555;
  border-radius: 4px;

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  ${HiddenCheckbox}:checked ~ & {
    background-color: #2196F3;
  }

  ${HiddenCheckbox}:checked ~ &:after {
    display: block;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const NormalModalContainer = styled.div`
  width: 80%;
  max-width: 300px;
  max-height: 700px;
  background: #fff;
  border-radius: 30px;
  gap: 10px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  margin: auto 0;
  
  p {
  font-weight: bold;
  }

  span {
    border: none;
    font-size: 0.8rem;
    background: #f6f6f6;
    border-radius: 30px;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .awardTitle {
    display: flex;
    align-items: center;
    gap: 10px;
    .detail {
      font-size: 0.7rem;
      svg {
        font-size: 1rem;
      }
    }
  }
  .awardCount {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: #fff;
    border: 1px solid #bb8900;
    gap: 10px;
    svg {
      font-size: 2.2rem;
    }
  }
  .delete, .cancle {
    flex: 1;
    border: none;
    background: #FFA3A3;
    margin: 20px 0 0 0;
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