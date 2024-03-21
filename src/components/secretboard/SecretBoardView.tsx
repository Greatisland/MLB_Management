import { Btn } from "../../style/globalStyled.tsx"
import { 
  SecretBoardBtnContainer, 
  SecretBoardContainer, 
  CommentContainer, 
  CommentBox, 
  CommentForm, 
  ViewUserListContainer
} from "../../style/secretBoardStyled.tsx"
import { useParams, useNavigate } from "react-router"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import { useState, useEffect } from "react"
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import type { Board } from "../../store/type.ts"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import Swal from "sweetalert2"
import { getToday } from "./SecretBoardWrite.tsx"

const SecretBoardView = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { loginUser, accountList } = useAppSelector(state => state.membersData)

  const [ article, setArticle ] = useState<Board>()

  //댓글
  const [ name, setName ] = useState('이름없는 누군가')
  const [ con, setCon ] = useState('')

  const handleUpdate = () => {
    navigate(`/boardwrite/${id}`)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if(con){
      const updateComments = {comments: [{nickName: '', contents: '', date: '',  uid: ''}]}
      if(article?.comments){
        article?.comments.push({nickName: name, contents: con, date: getToday(), uid: loginUser.uid})
        updateComments.comments = article.comments
      }else{
        updateComments.comments = [{nickName: name, contents: con, date: getToday(), uid: loginUser.uid}]
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
  
  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])

  //글 정보 가져오기
  useEffect(() => {
    dbFunc.getArticle(id).then((data) => {
      setArticle(data)
    })
  }, [])

  useEffect(() => {
    if(id) dbFunc.incrementViewCount(id, loginUser.uid)
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
      {loginUser.level >= 4 ? 
      <ViewUserListContainer>
        {article?.viewUsers?.map((user, i) => (
          <span key={i}>{user ? user : ''}</span>
        ))}
      </ViewUserListContainer> : null}
      <CommentContainer>
        {article?.comments?.map((comment, i) => {
          const secret = accountList.find(account => account[0] === comment.uid)
          return (
          <CommentBox key={i}>
            <span className="name">{comment.nickName}{secret && loginUser.level >= 4 ? <span className="secretName">{secret[1].name}</span> : null}</span>
            <span className="date">{comment.date}</span>
            <span className="content">{comment.contents}</span>
          </CommentBox>
        )})}
        <CommentForm onSubmit={handleComment}>
          <input type="text" maxLength={10} value={name} onChange={(e) => setName(e.target.value)}/>
          <textarea value={con} maxLength={200} onChange={(e) => setCon(e.target.value)}/>
          <Btn><button><p>댓글 등록</p></button></Btn>
        </CommentForm>
      </CommentContainer>
    </SecretBoardContainer>
  )
}

export default SecretBoardView