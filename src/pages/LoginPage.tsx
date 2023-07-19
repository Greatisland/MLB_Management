import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { auth } from "../firebase/firebaseFunc"
import JoinModal from "../components/common/JoinModal"


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
          {/* <div className="reset" onClick={handleReset}>비밀번호 재설정</div> */}
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