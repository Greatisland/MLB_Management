import { Btn } from "../../style/globalStyled.tsx"
import { Link, useNavigate } from "react-router-dom"
import { SecretBoardBtnContainer, SecretBoardListContainer } from "../../style/secretBoardStyled.tsx"
import type { Board } from "../../store/type.ts"
import { useAppSelector } from "../../store/hook.ts"
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
        const postUser = accountList.find(account => account[0] === article[1].uid)
        //비밀글일때
        if(article[1].secret){
          //운영진이거나 작성자면 렌더링
          if(loginUser.level >= 2 || loginUser.uid === article[1].uid){
            return (
              <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
                <span className="secretMark"><VscGistSecret />비밀글</span>
                {(postUser && loginUser.level >= 4) ? <span className="secretName">{postUser[1]?.name}</span> : null}
                <span className="title">{article[1]?.title}</span>
                <span className="commentAmount"><AiOutlineComment />{article[1]?.comments ? article[1].comments.length : 0}</span>
                <span className="viewAmount"><AiOutlineEye />{article[1]?.viewCount ? article[1].viewCount : 0}</span>
                <span className="date">{article[1]?.date}</span>
              </div>
            )
          }
        } else {
          return (
            <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
              {(postUser && loginUser.level >= 4) ? <span className="secretName">{postUser[1]?.name}</span> : null}
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