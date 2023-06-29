import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useEffect } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/Footer"
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { FaUserCircle } from 'react-icons/fa';
import KakaoLogin from "../kakao/kakaoLogin"

const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  useEffect(() => {
    if(loginUser.uid) navigate('/infopage')
  }, [loginUser])

  const kakaoLogin = () => {
    const RedirectURL = 'https://hyeonjin-dev-upgraded-waffle-55vg9x9q9r34rx4-5174.preview.app.github.dev/oauth'
  }

  return (
    <LoginWrapper>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>

        <div className="loginBtn" onClick={() => authFunc.loginGoogle()}>
          <FcGoogle />
          구글 로그인
        </div>
        <div className="loginBtn" onClick={() => kakaoLogin()}>
          <RiKakaoTalkFill />
          카카오 로그인
        </div>
        <KakaoLogin />
        <div className="loginBtn" onClick={() => authFunc.loginAccount('kinhyeonjin@naver.com', 'theisland4!')}>
          <FaUserCircle />
          게스트로 시작
        </div>
        {/* <li onClick={() => authFunc.stateAccount()}>확인</li> */}
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Home