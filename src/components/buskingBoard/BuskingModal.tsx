import { useState, useEffect } from "react";
import { BuskingModalWrapper, BuskingModalContainer } from "../../style/buskingBoardStyled";
import type { BuskingData } from "../../store/type";
import { dbFunc } from "../../firebase/firebaseFunc";
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleBuskingModal } from "../../store/slice.ts";
import Swal from "sweetalert2";

const BuskingModal = () => {
  const { loginUser, modalBuskingState, sendBusking } = useAppSelector(state => state.membersData)
  const [title, setTitle] = useState(sendBusking.title || '');
  const [content, setContent] = useState(sendBusking.content || '');
  const [date, setDate] = useState(sendBusking.date || '');
  const [participants, setParticipants] = useState(sendBusking.participants || []);
  const [location, setLocation] = useState(sendBusking.location || '');
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
    if (selectedDate < today) {
      newAlert("선택한 날짜는 오늘 이전 날짜일 수 없습니다.");
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
        title: "추가되었습니다.",
        html: `
          버스킹은 최소 3인 이상이어야 열 수 있어요.<br>
          <a href="#">links</a>,
          and other HTML tags
        `,
        icon: "success",
        confirmButtonText: '네'
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

              <p>장소</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

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