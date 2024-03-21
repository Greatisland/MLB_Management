import { useState } from "react";
import { BuskingModalWrapper, BuskingModalContainer } from "../../style/buskingBoardStyled";
import type { BuskingData } from "../../store/type";
import { dbFunc } from "../../firebase/firebaseFunc";

interface BuskingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BuskingData) => void;
}

const BuskingModal = ({ isOpen, onClose, onSubmit }: BuskingModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newArticle: BuskingData = {
      title,
      content,
      date,
      participants,
      location,
    };

    dbFunc.addBuskingArticle(newArticle);

    setTitle("");
    setContent("");
    setDate("");
    setParticipants("");
    setLocation("");

    onClose();
  };

  return (
    <>
      {isOpen && (
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
                required
              />
              <p>인원</p>
              <input
                type="number"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                required
              />

              <p>장소</p>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <input type="submit" value="등록" />
            </form>

            <div className="btnWrapper">
              <button className="cancel" onClick={onClose}>
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