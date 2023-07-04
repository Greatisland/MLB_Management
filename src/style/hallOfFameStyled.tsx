import styled from "styled-components";

export const HallOfFameContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
`

export const HofListContainer = styled.div`
  display: grid;
  border-radius: 20px;
  overflow: hidden;
  background: #2e1403;
  gap: 20px;
`
interface ImgUrl {
  imgUrl: string
}

const backImgUrl = 'https://firebasestorage.googleapis.com/v0/b/mlb-management.appspot.com/o/background.jpg?alt=media&token=3a2646d2-549d-4e3e-b46a-54c486c2a1f5'

export const HofCardContainer = styled.div<ImgUrl>`
  display: flex;
  padding: 30px 15px;
  gap: 15px;
  box-sizing: border-box;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background: #362104;
  color: #fff;
  .leftSide {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .textSide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(${backImgUrl}) center center/cover repeat;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
    h3 {
      font-size: 1rem;
      letter-spacing: 0.04rem;
    }
    p {
      font-size: 0.8rem;
      color: #444;
    }
    }
    .imgCon {
      width: 40vw;
      height: 45vw;
      border-radius: 10px;
      box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
      background: #333 url(${props => props.imgUrl}) center center/cover;
    }
  }

  .rightSide {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    border-radius: 12px;
    background: url(${backImgUrl}) repeat;
    box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
    span {
      font-weight: bold;
      color: #642b0a;
      margin: 0 0 4px;
    }
    p {
      font-size: 0.8rem;
      letter-spacing: 0.04rem;
      color: #f9f9f9;
      margin: 0 0 8px;
    }
  }

`

export const HofAddModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: #333;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  padding: 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const HofModalContainer = styled.div`
  width: 80%;
  max-width: 300px;
  max-height: 700px;
  overflow-y: scroll;
  scrollbar-width: thin; /* 스크롤바 너비 */
  background: #fff;
  border-radius: 30px;
  gap: 20px;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    width: 3px; /* 스크롤바 너비 */
    background: rgba(0, 0, 0, 0); /* 스크롤바 배경색 */
  }
  &::-webkit-scrollbar-thumb {
    background: #FFA3A3; /* 스크롤바 색상 */
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
   p {
    font-weight: bold;
   }

  input[type='text'] {
    border: none;
    background: #eee;
    border-radius: 30px;
    padding: 5px 10px;
    margin: 0 0 10px 0;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    text-align: center;
    cursor: pointer;
  }


  input[type='date'] {
    border: none; 
    position: relative;
    padding: 5px 10px;
    background: #eee;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    text-align: center;
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

  input[type='submit'] {
    border: none;
    background: #FF9CC7;
    border-radius: 30px;
    padding: 8px 10px;
    
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin: 40px 0 0;
  }

  .upload {
    border: none;
    background: #FF9CC7;
    border-radius: 30px;
    padding: 8px 10px;
    
    color: #fff;
    letter-spacing: 0.04rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin: 40px 0 0;
  }

  select {
    border: none;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    padding: 4px;
    border-radius: 12px;
    background: #eee;
    text-align: center;
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
      background: #eee;
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
    margin: 10px 0 0;
    gap: 20px;
  }
`