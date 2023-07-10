import { dbFunc } from "../firebase/firebaseFunc"
import { Btn } from "../style/globalStyled"
import { Link, useNavigate } from "react-router-dom"
import { SecretBoardBtnContainer, SecretBoardListContainer } from "../style/secretBoardStyled"
import { useState, useEffect } from "react"
import type { Board } from "../store/slice"
import { useAppSelector } from "../store/hook"
import { VscGistSecret } from 'react-icons/vsc'

const SecretBoardList = ({board}: [string, Board][]) => {
  const dummy = new Array(10).fill({title: '제목', content: '내용', date: '2002-11-11'})
  const navigate = useNavigate()

  const { loginUser } = useAppSelector(state => state.membersData)

  return (
    <SecretBoardListContainer>
      <SecretBoardBtnContainer>
        <Btn><Link to={`/boardwrite/0`}><p>글쓰기</p></Link></Btn>
      </SecretBoardBtnContainer>
      {board.map((article: any, i) => {
        //비밀글일때
        if(article[1].secret){
          //운영진이거나 작성자면 렌더링
          if(loginUser.level >= 2 || loginUser.uid === article[1].uid){
            return (
              <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
                <span className="secretMark"><VscGistSecret />비밀글</span><span className="title">{article[1]?.title}</span><span className="date">{article[1]?.date}</span>
              </div>
            )
          }
        }else {
          return (
            <div className="list" key={i} onClick={() => {navigate(`/boardview/${article[0]}`)}}>
              <span>{article[1]?.title}</span><span className="date">{article[1]?.date}</span>
            </div>
          )
        }
      })}
    </SecretBoardListContainer>
  )
}

export default SecretBoardList