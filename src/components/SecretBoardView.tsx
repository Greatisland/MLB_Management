import { Btn } from "../style/globalStyled"
import { SecretBoardBtnContainer, SecretBoardContainer } from "../style/secretBoardStyled"
import { useParams, useNavigate } from "react-router"
import { dbFunc } from "../firebase/firebaseFunc"
import { useState, useEffect } from "react"
import type { Board } from "../store/slice"
import { useAppSelector } from "../store/hook"


const SecretBoardView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loginUser } = useAppSelector(state => state.membersData)

  const [ article, setArticle ] = useState<Board>()

  const handleUpdate = () => {
    navigate(`/boardwrite/${id}`)
  }

  useEffect(() => {
    dbFunc.getArticle(id).then((data) => {
      setArticle(data)
    })
  }, [])


  return (
    <SecretBoardContainer>
      <SecretBoardBtnContainer>
        <Btn onClick={() => navigate('/secretboard')}><p>나가기</p></Btn>
        {loginUser.uid === article?.uid ?
        <Btn><button onClick={handleUpdate}><p>수정</p></button></Btn> :
        null}
      </SecretBoardBtnContainer>
      <p className="titleView">{article?.title}</p>
      <p className="contentView">{article?.content}</p>
    </SecretBoardContainer>
  )
}

export default SecretBoardView