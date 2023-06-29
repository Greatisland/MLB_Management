import { LoginContainer, LoginWrapper } from "../style/loginStyled"
import { authFunc } from "../firebase/firebaseFunc"
import { useEffect } from "react"
import { useAppSelector } from "../store/hook"
import { useNavigate } from "react-router"
import Footer from "../components/Footer"

const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  useEffect(() => {
    if(loginUser.uid) navigate('/infopage')
  }, [loginUser])

  return (
    <LoginWrapper>
      <LoginContainer>
        <div onClick={() => authFunc.loginAccount('kinhyeonjin@naver.com', 'theisland4!')}>그냥 로그인</div>
        <div onClick={() => authFunc.loginGoogle()}>구글 로그인</div>
        <div>카카오톡 로그인</div>
        <div onClick={() => authFunc.stateAccount()}>확인</div>
        <div onClick={() => authFunc.logout()}>로그아웃</div>
        <Footer />
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Home