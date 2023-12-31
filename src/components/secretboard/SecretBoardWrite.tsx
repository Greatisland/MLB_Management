import { useState, useEffect } from "react"
import { Btn } from "../../style/globalStyled.tsx"
import { EditorContainer, SecretBoardBtnContainer, SecretBoardContainer } from "../../style/secretBoardStyled.tsx"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { startSwiping, stopSwiping } from "../../store/slice.ts"
import Swal from "sweetalert2"

export const getToday = () => {
  const date = new Date()
  const year = String(date.getFullYear())
  const month = String(date.getMonth() + 1).padStart(2,'0')
  const day = String(date.getDate()).padStart(2,'0')
  return `${year}.${month}.${day}`
}

const SecretBoardWrite = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { loginUser } = useAppSelector(state => state.membersData)

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ secret, setSecret ] = useState(false)

  const navigate = useNavigate()



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //기존 글 수정
    if(id !== '0'){
      const update = {
        title, content, secret
      }
      dbFunc.updateArticle(id as string, update)
      navigate('/secretboard')
    }else{
      //신규 글 작성
      const date = getToday()
      const add = {title, content, date, secret, uid: loginUser.uid, comments: []}
      if(title && content){
        dbFunc.addArticle(add)
        Swal.fire({
          icon: 'success',
          title: `글이 작성되었어요!`,
          showConfirmButton: false,
          timer: 800
        })
      navigate('/secretboard')

      }else{
        Swal.fire({
          html: `
            제목과 내용을 채워주세요!
          `,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: "알겠습니다 ㅠㅠ",
        })
      }
    }
  }

  useEffect(() => {
    if(id !== '0'){
      dbFunc.getArticle(id).then((data) => {
        setTitle(data.title)
        setContent(data.content)
        setSecret(data.secret)
      })
    }
  }, [])

  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])

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
          dbFunc.removeArticle(id)
        }
        navigate('/secretboard')
      }else{
        return
      }
    })
  }

  return (
    <SecretBoardContainer>
      <EditorContainer onSubmit={handleSubmit}>
        <SecretBoardBtnContainer>
          <Btn><input type="checkbox" id="check" checked={secret} onChange={(e) => setSecret(e.target.checked)}/><label htmlFor="check"><p className="checkText">비공개 유무</p></label></Btn>
          <Btn><Link to="/secretboard"><p>취소</p></Link></Btn>
          {id !== '0' ? <Btn onClick={handleDelete}><p>삭제</p></Btn> : null}
          <Btn><button><p>완료</p></button></Btn>
        </SecretBoardBtnContainer>
        <p className="notice">비공개에 체크할 경우 일반회원은 이 글을 볼 수 없으며 작성자 본인과 운영진만 볼 수 있습니다. 건의사항, 피드백, 아무 말 등 자유롭게 사용하세요.
        <br /><br />
        </p>

        <input type="text" className="titleArea" maxLength={20} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요."/>
        <textarea className="contentArea" maxLength={1000} value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요."/>
        <p className="notice">글의 내용은 1000자 이하로 제한됩니다.</p>
      </EditorContainer>


    </SecretBoardContainer>
  )
}

export default SecretBoardWrite