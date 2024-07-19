import { HeaderContainer } from "../../style/headerStyle.tsx"
import MemberModal from "./MemberModal.tsx";
import { useAppSelector } from "../../store/hook.ts";
import { Link } from "react-router-dom";
import { authFunc } from "../../firebase/firebaseFunc.ts";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { modalState, loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()
  const location = useLocation()

  //로그인 페이지에서 헤더 숨김
  if('/LoginPage'.includes(location.pathname)) return <></>

  return (
    <HeaderContainer $photourl={loginUser.photoURL}>
      <Link to='/infopage'><h1 className="eng">MLB MANAGEMENT</h1></Link>
      {loginUser.state ? 
      <div className="btns">
        {loginUser.photoURL? <div className="photo" /> : null}
        <p className="hi">{loginUser.name ? loginUser.name : (loginUser.level >= 2 ? '뮤라밸 운영진' : '뮤라밸 게스트')}님, 안녕하세요!</p>
        <div className="logout" onClick={() => {
          navigate('/')
          authFunc.logout()
        }}>로그아웃</div>
      </div> : 
      <div className="login" onClick={() => {navigate('/LoginPage')}}>로그인</div>}
      {modalState ? <MemberModal /> : null}
    </HeaderContainer>
  )
}

export default Header