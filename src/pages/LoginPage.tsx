import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/common/Footer"
import { BsPersonBoundingBox } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
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

  return (
    <LoginWrapper>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>
        {!auth.currentUser ? 
        <>
        {isModal ? <JoinModal setIsModal={setIsModal}/> : null}
        <form className="loginForm" onSubmit={handleLogin}>
          <input type="text" ref={emailRef} placeholder="이메일을 입력하세요"></input>
          <input type="password" ref={pwRef} placeholder="비밀번호를 입력하세요"></input>
          <input type="submit" value="로그인" />
        </form>
        <div className="loginBtn joinBtn" onClick={() => setIsModal(true)}>
          <BsPersonBoundingBox />
          회원가입
        </div>
        <div className="loginBtn" onClick={() => authFunc.loginGoogle()}>
          <FcGoogle />
          구글 로그인
        </div>
        </>
        : null}
        {/* <div className="loginBtn guestBtn" onClick={() => authFunc.loginAccount('guest@mlb.com', 'abc123')}>
          <FaUserCircle />
          게스트로 시작
        </div> */}
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default LoginPage