import styled from "styled-components";
import { SwiperSlide } from 'swiper/react';

export const HallOfFameContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 20px auto;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 90px 20px;
  background: #181717;
`

export const HofListContainer = styled.div`
  display: grid;
`

export const HofCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px){
    flex-direction: row;
  }
  padding: 40px 15px;
  gap: 15px;
  box-sizing: border-box;

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
      background: #181717;
      border-top: 2px solid #c5a26e;
      border-bottom: 2px solid #c5a26e;
      padding: 4px 0;
      border-radius: 12px;
      box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
      cursor: pointer;
      h3 {
        font-size: 1rem;
        letter-spacing: 0.04rem;
        color: #f2c684;
      }
      p {
        font-size: 0.8rem;
        color: #c5a26e;
      }
    }
  }

  .rightSide {
    flex: 1;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    border-radius: 12px;
    background: #181717;
    border: 2px solid #c5a26e;
    box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    span {
      display: block;
      font-weight: bold;
      color: #c5a26e;
      margin: 0 0 4px 0;
    }
    p.name {
      font-size: 0.9rem;
      letter-spacing: 0.04rem;
      color: #f9f9f9;
    }
    p.track {
      font-size: 0.75rem;
      letter-spacing: -0.04rem;
      text-align: center;
      color: #b6b6b6;
    }
    a {
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      color: #fff;
      gap: 4px;
      svg {
        font-size: 1.5rem;
        fill: #c90000;
      }
    }
  }
`

export const HofAddModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: #333;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  overflow-y: auto;
  z-index: 100;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export const HofModalContainer = styled.div`
  width: 100%;
  @media (min-width: 768px){
    width: 600px;
    padding: 40px;
  }
  overflow-y: scroll;
  scrollbar-width: thin; /* 스크롤바 너비 */
  background: #fff;
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
    width: 100%;
    position: relative;
    padding: 5px 10px;
    box-sizing: border-box;
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

  .addBtn {
    border: none;
    background: ${props=> props.theme.green};
    border-radius: 30px;
    padding: 8px 10px;
    margin: 20px 0 0;
    color: #fff;
    letter-spacing: 0.04rem;
    text-align: center;
    font-size: 0.8rem;
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
    cursor: pointer;
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

export const SwiperContainer = styled.div`
  width: 100%;
  position: relative;
  @media (min-width: 768px){
    width: 42vw;
    max-width: 500px;
  }
  svg {
    position: absolute;
    font-size: 1.2rem;
    border-radius: 50%;
    background: rgba(0,0,0,0.3);
    fill: #fff;
    z-index: 999;
    top: calc(50% - 10px);
    &.left {
      left: 10px;
    }
    &.right {
      right: 10px;
    }
  }
`

interface ImgUrl {
  ImgUrl: string
}

export const StyledSwiperSlide = styled(SwiperSlide)<ImgUrl>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  width: 100% !important;
  height: 60vw;
  max-height: 450px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(63, 31, 1, 0.4);
  background: #333 url(${props => props.ImgUrl}) center center/cover;
`

export const YearIndicator = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.6rem;
  background: rgba(0, 0, 0, 0.7); // 투명도 추가
  padding: 10px 6px;
  border-radius: 12px;
  top: 50%;
  border: none;
  right: 10px;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); // 그림자 추가

  div {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    padding: 8px 0;
    margin-bottom: 4px;
    /* transition: all 0.3s; // 부드러운 전환 효과 */

    &:hover {
      color: rgba(255, 255, 255, 1); // 호버 효과
    }
  }
  div.active {
    color: #ffcc00; // 활성화된 년도 색상 변경
    font-size: 0.8rem;
    font-weight: bold;
  }
`;