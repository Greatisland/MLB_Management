import { useState, useEffect } from "react";
import { BuskingModalWrapper, BuskingModalContainer } from "../../style/buskingBoardStyled";
import type { BuskingData } from "../../store/type";
import { dbFunc } from "../../firebase/firebaseFunc";
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleBuskingModal } from "../../store/slice.ts";

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
      console.log('수정')
      dbFunc.updateBuskingArticle(sendBusking.id ,newArticle)
    }else{
    // 신규 생성이면
    console.log('생성')
      dbFunc.addBuskingArticle(newArticle);
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
      // // 버스킹 정보 전달 데이터 초기화
      // dispatch(sendBusking({
      //   id: '',
      //   title: '',
      //   content: '',
      //   date: '',
      //   participants: [],
      //   location: ''
      // }))
      // 스와이프 다시 시작
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
                required
              ></textarea>

              <p>예상날짜</p>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              {/* <p>참여인원</p>
              <input
                type="number"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              /> */}

              <p>장소</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input type="submit" value="등록" />
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