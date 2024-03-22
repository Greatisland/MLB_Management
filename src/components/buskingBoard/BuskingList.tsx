import type { BuskingData } from "../../store/type"
import { BuskingListContainer, BuskingBar } from "../../style/buskingBoardStyled"
import { useNavigate } from "react-router"

const BuskingList = ({articles}: {articles: BuskingData[]}) => {
  const navigate = useNavigate()
  return (
    <BuskingListContainer>
      <div>버스킹 규칙 공지</div>
    {articles.map((article) => (
      <div
       key={article.id}
       className='con'
       onClick={() => navigate(`/buskingboardview/${article.id}`)}
      >
        <div className="info">
          <span className='date'>{article.date}</span>
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
        {/* <p className='content'>{article.content}</p> */}



      </div>
    ))}
  </BuskingListContainer>
  )
}

export default BuskingList