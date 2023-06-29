import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useEffect } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/Footer"
import { GrFacebook } from 'react-icons/gr';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import { auth } from "../firebase/firebaseFunc"

const Home = () => {
  
  const { loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  useEffect(() => {
    if(loginUser.uid) navigate('/infopage')
  }, [loginUser])


  return (
    <LoginWrapper>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>
        {!auth.currentUser ? 
        <>
        <div className="loginBtn" onClick={() => authFunc.loginGoogle()}>
          <FcGoogle />
          구글 로그인
        </div>
        <div className="loginBtn" onClick={() => authFunc.loginFacebook()}>
          <GrFacebook />
          페이스북 로그인
        </div>
        </>
        : null}
        <div className="loginBtn" onClick={() => authFunc.loginAccount('guest@mlb.com', 'abc123')}>
          <FaUserCircle />
          게스트로 시작
        </div>
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Home