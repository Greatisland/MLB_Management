import type { BuskingData } from "../../store/type"
import { 
  BuskingListContainer, 
  BuskingBar,
  BuskingNoticeContainer,
  BuskingCard
} from "../../style/buskingBoardStyled"
import { useNavigate } from "react-router"
import { formatDate } from "../../lib/formatDate"
import { IoIosNotifications } from "react-icons/io";
import BuskingNoticeModal from "./BuskingNoticeModal";
import { useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";

const BuskingList = ({articles}: {articles: BuskingData[]}) => {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false);

  
  const deadline = (date: string) => {
    const endDay = new Date(date).getDate()
    const today = new Date().getDate()
    return endDay - today
  }

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
        {deadline(article.date) <= 10 && !article.end &&
        <div className="emagency">
          <AiOutlineNotification />참가투표가 곧 마감됩니다.
        </div>
        }
        <div className="info">
          <span className='date'>{formatDate(article.date)}</span>
          <span className='deadline'>{deadline(article.date)}일 뒤</span>
          <span className='location'>{article.location}</span>
        </div>
        <div className="head">
          <h3>{article.title}</h3>
          {/* <span className='participants'>{article?.participants?.length || 0}명</span> */}
          <span className='user'>{article.user}</span>
        </div>
        <BuskingBar percentage={((article?.participants?.length || 0) / 8) * 100}>
          <div className='fill'>
            {/* <span>{(article?.participants?.length) || 0}/8</span> */}
            <span className='percent'>{((article?.participants?.length || 0) / 8) * 100}%</span>
          </div>
        </BuskingBar>
      </BuskingCard>
    ))}
  </BuskingListContainer>
  )
}

export default BuskingList