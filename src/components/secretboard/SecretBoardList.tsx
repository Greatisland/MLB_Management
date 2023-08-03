import { Btn } from "../../style/globalStyled"
import { Link, useNavigate } from "react-router-dom"
import { SecretBoardBtnContainer, SecretBoardListContainer } from "../../style/secretBoardStyled"
import type { Board } from "../../store/slice"
import { useAppSelector } from "../../store/hook"
import { VscGistSecret } from 'react-icons/vsc'
import { AiOutlineComment, AiOutlineEye } from 'react-icons/ai'


const SecretBoardList = ({board}: {board :[string, Board][]}) => {
  const navigate = useNavigate()

  const { loginUser, accountList } = useAppSelector(state => state.membersData)

  return (
    <SecretBoardListContainer>
      <SecretBoardBtnContainer>
        <Btn><Link to={`/boardwrite/0`}><p>글쓰기</p></Link></Btn>
      </SecretBoardBtnContainer>
      {board.map((article: any, i: number) => {
        //비밀글일때
        if(article[1].secret){
          //운영진이거나 작성자면 렌더링
          if(loginUser.level >= 2 || loginUser.uid === article[1].uid){
            //운영진일떄
            if(loginUser.level >= 2){
              const secret = accountList.find(account => account[0] === article[1].uid)
              return (
                <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
                  <span className="secretMark"><VscGistSecret />비밀글</span>
                  {secret ? <span className="secretName">{secret[1]?.name}</span> : null}
                  <span className="title">{article[1]?.title}</span>
                  <span className="commentAmount"><AiOutlineComment />{article[1]?.comments ? article[1].comments.length : 0}</span>
                  <span className="viewAmount"><AiOutlineEye />{article[1]?.viewCount ? article[1].viewCount : 0}</span>
                  <span className="date">{article[1]?.date}</span>
                </div>
              )
            }

            return (
              <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
                <span className="secretMark"><VscGistSecret />비밀글</span>
                <span className="title">{article[1]?.title}</span>
                <span className="commentAmount"><AiOutlineComment />{article[1]?.comments ? article[1].comments.length : 0}</span>
                <span className="viewAmount"><AiOutlineEye />{article[1]?.viewCount ? article[1].viewCount : 0}</span>
                <span className="date">{article[1]?.date}</span>
              </div>
            )
          }
        } else {
          if(loginUser.level >= 2){
            const secret = accountList.find(account => account[0] === article[1].uid)
            //운영진일때
            return (
              <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
                {secret ? <span className="secretName">{secret[1]?.name}</span> : null}
                <span className="title">{article[1]?.title}</span>
                <span className="commentAmount"><AiOutlineComment />{article[1]?.comments ? article[1].comments.length : 0}</span>
                <span className="viewAmount"><AiOutlineEye />{article[1]?.viewCount ? article[1].viewCount : 0}</span>
                <span className="date">{article[1]?.date}</span>
              </div>
            )
          }
          return (
            <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
              <span className="title">{article[1]?.title}</span>
              <span className="commentAmount"><AiOutlineComment />{article[1]?.comments ? article[1].comments.length : 0}</span>
              <span className="viewAmount"><AiOutlineEye />{article[1]?.viewCount ? article[1].viewCount : 0}</span>
              <span className="date">{article[1]?.date}</span>
            </div>
          )
        }
      })}
    </SecretBoardListContainer>
  )
}

export default SecretBoardList