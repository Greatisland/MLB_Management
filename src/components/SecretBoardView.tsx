import { Btn } from "../style/globalStyled"
import { SecretBoardBtnContainer, SecretBoardContainer, CommentContainer, CommentBox, CommentForm } from "../style/secretBoardStyled"
import { useParams, useNavigate } from "react-router"
import { dbFunc } from "../firebase/firebaseFunc"
import { useState, useEffect } from "react"
import type { Board } from "../store/slice"
import { useAppSelector } from "../store/hook"
import Swal from "sweetalert2"
import { getToday } from "./SecretBoardWrite"

const SecretBoardView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loginUser } = useAppSelector(state => state.membersData)

  const [ article, setArticle ] = useState<Board>()

  //댓글
  const [ name, setName ] = useState('이름없는 누군가 ')
  const [ con, setCon ] = useState('')

  const handleUpdate = () => {
    navigate(`/boardwrite/${id}`)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if(con){
      const updateComments = {comments: [{nickName: '', contents: '', date: ''}]}
      if(article?.comments){
        article?.comments.push({nickName: name, contents: con, date: getToday()})
        updateComments.comments = article.comments
      }else{
        updateComments.comments = [{nickName: name, contents: con, date: getToday()}]
      }
      if(typeof id === 'string'){
        dbFunc.updateArticle(id, updateComments)
      }

      const updatedArticle = await dbFunc.getArticle(id)
      setArticle(updatedArticle)

    }else{
      Swal.fire({
        html: `
          닉네임과 댓글 내용을 써주세요!
        `,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "알겠습니다 ㅠㅠ",
      })
    }
    setCon('')
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
        {loginUser.uid === article?.uid || loginUser.level >= 4 ?
        <Btn><button onClick={handleUpdate}><p>수정</p></button></Btn> :
        null}
      </SecretBoardBtnContainer>
      <p className="titleView">{article?.title}</p>
      <p className="contentView">{article?.content}</p>
      <CommentContainer>
        {article?.comments?.map((comment, i) => (
          <CommentBox key={i}>
            <span className="name">{comment.nickName}</span>
            <span className="date">{comment.date}</span>
            <span className="content">{comment.contents}</span>
          </CommentBox>
        ))}
        <CommentForm onSubmit={handleComment}>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
          <textarea value={con} onChange={(e) => setCon(e.target.value)}/>
          <Btn><button><p>댓글 등록</p></button></Btn>
        </CommentForm>
      </CommentContainer>
    </SecretBoardContainer>
  )
}

export default SecretBoardView