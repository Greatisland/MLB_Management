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

const BuskingList = ({articles}: {articles: BuskingData[]}) => {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false);
  
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
        <div className="info">
          <span className='date'>{formatDate(article.date)}</span>
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