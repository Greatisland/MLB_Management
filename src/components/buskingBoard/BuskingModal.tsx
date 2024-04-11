import { useState, useEffect } from "react";
import { BuskingModalWrapper, BuskingModalContainer } from "../../style/buskingBoardStyled";
import type { BuskingData } from "../../store/type";
import { dbFunc } from "../../firebase/firebaseFunc";
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleBuskingModal } from "../../store/slice.ts";
import Swal from "sweetalert2";

const BuskingModal = () => {
  const basicContent = `
    버스킹 시간: ex) 13시~17시
    연습장소: ex) 구일즈 연습실
  `

  const { loginUser, modalBuskingState, sendBusking } = useAppSelector(state => state.membersData)
  const [title, setTitle] = useState(sendBusking.title || '');
  const [content, setContent] = useState(sendBusking.content || basicContent);
  const [date, setDate] = useState(sendBusking.date || '');
  const [participants, setParticipants] = useState(sendBusking.participants || []);
  const [location, setLocation] = useState(sendBusking.location || '');
  const [max, setMax] = useState(sendBusking.max || '3');
  const [deadline, setDeadline] = useState(sendBusking.deadline || '7');
  const dispatch = useAppDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAlert = (param: string) => {
      return Swal.fire({
        html: param,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "알겠습니다 ㅠㅠ",
      })
    }

    // 유효성 검증
    if (title.length > 20) {
      newAlert('제목은 20자 안으로 작성해주세요!')
      return;
    }

    if (content.length > 400) {
      newAlert("내용은 400자를 넘을 수 없습니다.");
      return;
    }

    const today = new Date();
    const selectedDate = new Date(date);
    
    // 현재 날짜에 10일을 더한 날짜를 계산.
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);

    if (selectedDate <= minDate) {
      newAlert("오늘로부터 10일 이상의 날짜로 설정해주세요.");
      return;
    }

    const newArticle: BuskingData = {
      title,
      uid: loginUser.uid,
      user: loginUser.name,
      content,
      date,
      participants,
      location,
      end: false,
      max,
      deadline,
    };

    // 전달된 정보가 있으면(수정이면)
    if(sendBusking && sendBusking.id){
      dbFunc.updateBuskingArticle(sendBusking.id ,newArticle)
    }else{
    // 신규 생성이면
      dbFunc.addBuskingArticle({...newArticle, participants: [{
        name: loginUser.name,
        uid: loginUser.uid
      }]});
      Swal.fire({
        title: "꼭 확인해주세요!",
        html: `
        버스킹을 시작하기 전에, 화면 상단에 위치한 **<b>버스킹 만들기/참가하기 방법</b>**을 반드시 확인해 주세요! <br><br>
        버스킹 시작 7일 전에는 자동으로 밴드에 일정이 등록됩니다. 이때부터는 참가 인원 투표가 불가능하니, 사전에 계획을 잘 세우고 참여해 주시기 바랍니다.
        `,
        icon: "success",
        confirmButtonText: '확인'
      });
    }

    setTitle("");
    setContent("");
    setDate("");
    setParticipants([]);
    setLocation("");
    
    dispatch(toggleBuskingModal());
  };

  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])

  return (
    <>
      {modalBuskingState && (
        <BuskingModalWrapper>
          <BuskingModalContainer>
            <form onSubmit={handleSubmit}>
              <p>제목</p>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <p>내용</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>

              <p>예상 날짜</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <p>버스킹 장소</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <div className="box">
                <div className="sub_box">
                <p>최대 인원</p>
                <input 
                  type="number"
                  value={max}
                  min='2'
                  max='8'
                  onChange={(e) => setMax(e.target.value)}
                />
                </div>

                <div className="sub_box">
                  <p>마감되는 날짜</p>
                  <div className="sub_box2">
                  <input 
                    type="number"
                    value={deadline}
                    min='7'
                    max='30'
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                  <span>일 전</span>
                  </div>
                </div>
              </div>


              <input type="submit" value={sendBusking.id ? '수정' : '등록'} />
            </form>

            <div className="btnWrapper">
              <button className="cancel" onClick={() => dispatch(toggleBuskingModal())}>
                취소
              </button>
            </div>
          </BuskingModalContainer>
        </BuskingModalWrapper>
      )}    
    </>
  );
};

export default BuskingModal;