import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useEffect } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/Footer"
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';

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

        <div className="loginBtn" onClick={() => authFunc.loginGoogle()}>
          <FcGoogle />
          구글 로그인
        </div>
        <div className="loginBtn">
          <RiKakaoTalkFill />
          카카오 로그인
        </div>
        <div className="loginBtn" onClick={() => authFunc.loginAccount('kinhyeonjin@naver.com', 'theisland4!')}>
          <FaUserCircle />
          공용계정으로 시작
        </div>

        {/* <li onClick={() => authFunc.stateAccount()}>확인</li> */}
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Home