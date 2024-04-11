import type { BuskingData } from "../../store/type"
import { 
  BuskingListContainer, 
  BuskingBar,
  BuskingNoticeContainer,
  BuskingCard,
  CommentNumber
} from "../../style/buskingBoardStyled"
import { useNavigate } from "react-router"
import { formatDate } from "../../lib/formatDate"
import { IoIosNotifications } from "react-icons/io";
import BuskingNoticeModal from "./BuskingNoticeModal";
import { useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

const BuskingList = ({articles}: {articles: BuskingData[]}) => {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false);

  
  const deadline = (date: string): number => {
    const endDay: Date = new Date(date);
    const today: Date = new Date();
  
    // 시간을 0으로 설정하여, 날짜만 비교하도록 함
    endDay.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    // 두 날짜의 차이를 밀리초 단위로 계산
    const diff: number = endDay.getTime() - today.getTime();
  
    // 밀리초를 일 단위로 변환
    return diff / (1000 * 60 * 60 * 24);
  };

  return (
    <BuskingListContainer>
      <BuskingNoticeContainer onClick={() => {
        document.body.classList.add('no-scroll'),
        setIsModal(!isModal)
      }}>
        <IoIosNotifications />
        버스킹 만들기/참가하기 방법
      </BuskingNoticeContainer>
      {isModal && <BuskingNoticeModal setIsModal={setIsModal}/>}
    {articles.map((article) => (
      <BuskingCard
       key={article.id}
       onClick={() => navigate(`/buskingboardview/${article.id}`)}
       end={article.end}
      >
        {/* {article.end && <span className="fixed"> - Fixed - </span>} */}
        <div className="wrap">
        {deadline(article.date) <= 14 && !article.end &&
        <div className="emagency">
          <AiOutlineNotification />{deadline(article.date) - Number(article.deadline)}일 후 참가투표가 마감됩니다.
        </div>}

        <div className="info">
          <span className='date'>{formatDate(article.date)}</span>
          {/* <span className='deadline'>{deadline(article.date)}일 뒤</span> */}
          <span className='location'>{article.location}</span>
          {/* <div className="comment"><FaRegComment />{article.comments?.length}</div> */}
          <CommentNumber com={article?.comments?.length || 0}><FaComment /></CommentNumber>
        </div>
        <div className="head">
          <h3>{article.title}</h3>
          {/* <span className='participants'>{article?.participants?.length || 0}명</span> */}
          <span className='user'>{article.user}</span>
        </div>
        <BuskingBar percentage={((article?.participants?.length || 0) / Number(article.max)) * 100}>
          <div className='fill'>
            {/* <span>{(article?.participants?.length) || 0}/8</span> */}
            <span className='percent'>{((article?.participants?.length || 0) / Number(article.max)) * 100}%</span>
          </div>
        </BuskingBar></div>
      </BuskingCard>
    ))}
  </BuskingListContainer>
  )
}

export default BuskingList