import { Btn } from "../../style/globalStyled.tsx"
import { 
  BuskingViewContainer,
  BuskingTitle,
  BuskingInfo,
  BuskingParticipantsList,
  BuskingContent,
  BuskingBar,
  CommentSection,
  CommentList,
  CommentItem,
  CommentMeta,
  CommentForm,
  BuskingVote
} from "../../style/buskingBoardStyled.tsx"
import { useParams, useNavigate } from "react-router"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import { useState, useEffect } from "react"
import { sendBusking, startSwiping, stopSwiping, toggleBuskingModal } from "../../store/slice.ts"
import type { BuskingData } from "../../store/type.ts"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import Swal from "sweetalert2"
import { FaEye, FaUser, FaRegComment } from "react-icons/fa";
import { formatDate } from "../../lib/formatDate.ts"

const BuskingView = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { loginUser } = useAppSelector(state => state.membersData)

  const [ article, setArticle ] = useState<BuskingData>()

  const getToday = () => {
    const date = new Date()
    const year = String(date.getFullYear())
    const month = String(date.getMonth() + 1).padStart(2,'0')
    const day = String(date.getDate()).padStart(2,'0')
    return `${year}.${month}.${day}`
  }

  //댓글
  const [ con, setCon ] = useState('')

  const handleUpdate = () => {
    dispatch(sendBusking({...article, id}))
    dispatch(toggleBuskingModal())
    navigate(`/buskingboard`)
  }

  const handleDelete = () => {
    Swal.fire({
      title: `정말로 지우시겠어요?`,
      text: "한번 지우면 복구할 수 없어요!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '지우겠습니다.',
      cancelButtonText: '지우지 않겠습니다.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제완료',
          html: `
          글이 사라졌어요!
          `,
          showConfirmButton: false,
          timer: 1000
        })
        if(typeof id === 'string'){
          dbFunc.removeBuskingArticle(id)
        }
        navigate('/buskingboard')
      }else{
        return
      }
    })
  }

  const handlePart = (param: boolean) => {
    if(
      (article?.participants?.length || 0) >= 8 && param
      ||
      article?.end
      ){
      Swal.fire({
        html: `
          ${article?.end ? 
            '남은 시간이 7일 이하일 경우 투표결과를 바꿀 수 없어요.':
            '참가인원이 모두 꽉 찼어요.'}
        `,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "알겠습니다 ㅠㅠ",
      })
      return
    }
    if (article) {
      let part: { uid: string; name: string }[] = article.participants || [];
      const user = { uid: loginUser.uid, name: loginUser.name };
  
      if (param) {
        // 참가자 추가
        if (!part.some((val) => val.uid === user.uid)) {
          part.push(user);
        }
      } else {
        // 참가자 제거
        part = part.filter((val) => val.uid !== user.uid);
      }
  
      const updatedArticle: BuskingData = {
        ...article,
        participants: part,
      };
  
      setArticle(updatedArticle);
      id && dbFunc.updateBuskingArticle(id, { participants: part });
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if(con){
      const updateComments = {comments: [{name: '', contents: '', date: '',  uid: ''}]}
      if(article?.comments){
        article?.comments.push({name: loginUser.name, contents: con, date: getToday(), uid: loginUser.uid})
        updateComments.comments = article.comments
      }else{
        updateComments.comments = [{name: loginUser.name, contents: con, date: getToday(), uid: loginUser.uid}]
      }
      if(typeof id === 'string'){
        dbFunc.updateBuskingArticle(id, updateComments)
      }

      const updatedArticle = await dbFunc.getBuskingArticle(id)
      setArticle(updatedArticle)

    }else{
      Swal.fire({
        html: `
          댓글 내용을 써주세요!
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
    dbFunc.getBuskingArticle(id).then((data) => {
      console.log(data)
      setArticle(data)
    })
  }, [])


  useEffect(() => {
    if(id) dbFunc.incrementViewCount(id, loginUser.uid, 'busking')
  }, [])

  return (
    <BuskingViewContainer>
      <div className='title'>
        {loginUser.uid === article?.uid || loginUser.level >= 4 ?
          <Btn onClick={handleUpdate}><p>수정</p></Btn> :
        null}
        {loginUser.uid === article?.uid || loginUser.level >= 4 ?
          <Btn onClick={handleDelete}><p>삭제</p></Btn> :
        null}
        <Btn onClick={() => navigate('/buskingboard')}><p>나가기</p></Btn>
      </div>
      <BuskingTitle>
        {article?.title}
        <div className="viewCount">
          <FaEye /> {article?.viewCount || 0}
        </div>
      </BuskingTitle>
      <BuskingInfo>
        <p>작성자 <span>{article?.user}</span></p>
        <p>버스킹 일자 <span>{formatDate(article?.date || '')}</span></p>
        <p>장소 <span>{article?.location}</span></p>
      </BuskingInfo>
      {/* <BuskingBar percentage={(article?.participants.length / 8) * 100}> */}
      <BuskingBar percentage={((article?.participants?.length || 0) / 8) * 100}>
        <div className='fill'>
          <span>{(article?.participants?.length) || 0}/8</span>
          {/* <span>{(test.length / 8) * 100}</span> */}
        </div>
      </BuskingBar>
      <BuskingParticipantsList>
        <p>참여하는 사람</p>
      {article?.participants && article?.participants.map((user, i) => (
        <span key={i}>{user.name}</span>
      ))}
      </BuskingParticipantsList>
      <BuskingVote>
        <div onClick={() => {handlePart(true)}}>참여하기</div>
        <div onClick={() => {handlePart(false)}}>취소하기</div>
      </BuskingVote>
      <BuskingContent>{article?.content}</BuskingContent>
      <CommentSection>
        <h3><FaRegComment />댓글 ({article?.comments ? Object.keys(article?.comments).length : 0})</h3>
        <CommentList>
          {article?.comments &&
            Object.entries(article?.comments).map(([commentId, comment]) => (
              <CommentItem key={commentId}>
                <CommentMeta>
                  <span className='name'><FaUser />{comment.name}</span>
                  <span>{comment.date}</span>
                </CommentMeta>
                <p>{comment.contents}</p>
              </CommentItem>
            ))}
        </CommentList>
        <CommentForm onSubmit={handleComment}>
          <textarea value={con} maxLength={200} onChange={(e) => setCon(e.target.value)}/>
          <Btn><button><p>댓글 등록</p></button></Btn>
        </CommentForm>
      </CommentSection>
    </BuskingViewContainer>
  )
}

export default BuskingView