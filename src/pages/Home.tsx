import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useState, useEffect, useRef } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/Footer"

const Home = () => {

  // const email = useRef<HTMLInputElement>(null)
  // const pw = useRef<HTMLInputElement>(null)

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   const setEmail = email.current?.value || ''
  //   const setPw = pw.current?.value || ''

  //   authFunc.loginAccount(setEmail, setPw)
  // }
  const [test, setTest] = useState('')
  const { loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  useEffect(() => {
    if(loginUser) navigate('/infopage')
  }, [loginUser])

  return (
    <LoginWrapper>
      <LoginContainer>
        {/* <form onSubmit={handleLogin}>
          <input type="text" ref={email} placeholder="이메일을 입력하세요"></input>
          <input type="text" ref={pw} placeholder="비밀번호를 입력하세요"></input>
          <input type="submit"></input>
        </form> */}
        {/* <div>회원가입</div> */}
        <p>로그인 기능 테스트중입니다...........</p>
        <div onClick={() => authFunc.loginGoogle()}>구글 로그인</div>
        <div>카카오톡 로그인</div>
        <div onClick={() => authFunc.stateAccount()}>확인</div>
        <div onClick={() => console.log('xxx')}>먼데</div>
        <div onClick={() => {setTest('로그아웃')}}>로그아웃</div>
        <p>{test}?</p>
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Home