import { LoginContainer, LoginWrapper } from "../style/loginStyled.tsx"
import { authFunc } from "../firebase/firebaseFunc.ts"
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../store/hook.ts"
import { useNavigate } from "react-router"
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import JoinModal from "../components/common/JoinModal.tsx"
import Swal from "sweetalert2"

const LoginPage = () => {
  const [ isModal, setIsModal ] = useState(false)
  const { loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  useEffect(() => {
    if(loginUser.uid) navigate('/infopage')
  }, [loginUser])

  const emailRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    let email = emailRef.current?.value || ''
    let pw = pwRef.current?.value || ''
    authFunc.loginAccount(email,pw)
  }

  const handleGoogleLogin = () => {
    authFunc.loginGoogle()
  }

  const handleReset = () => {
    Swal.fire({
      title: `비밀번호 재설정`,
      text: "가입하신 계정의 이메일을 입력해주세요. 해당 이메일로 비밀번호 재설정 메일이 전송됩니다.",
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: '메일 전송',
      cancelButtonText: '취소',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const correctEmail = regex.test(email)
        if(correctEmail){
          authFunc.resetPass(email)
        }else if(!correctEmail){
          Swal.showValidationMessage(`올바른 이메일 형식을 입력해주세요.`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('전송완료!', '이메일을 확인해주세요.', 'success')
        }
    })
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>
        {isModal ? <JoinModal setIsModal={setIsModal}/> : null}
        <form className="loginForm" onSubmit={handleLogin}>
          <input type="text" ref={emailRef} placeholder="이메일을 입력하세요"></input>
          <input type="password" ref={pwRef} placeholder="비밀번호를 입력하세요"></input>
          <input type="submit" value="로그인" />
          <div className="reset" onClick={handleReset}>비밀번호 재설정</div>
        </form>
        <div className="loginBtn joinBtn" onClick={() => setIsModal(true)}>
          <BsPersonBoundingBox />
          회원가입
        </div>
        <div className="loginBtn" onClick={handleGoogleLogin}>
          <FcGoogle />
          구글 로그인
        </div>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default LoginPage