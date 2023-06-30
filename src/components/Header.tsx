import { HeaderContainer } from "../style/headerStyle"
import MemberModal from "./MemberModal";
import { useAppSelector } from "../store/hook";
import { Link } from "react-router-dom";
import { authFunc } from "../firebase/firebaseFunc";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { modalState, loginUser } = useAppSelector(state => state.membersData)
  const navigate = useNavigate()

  return (
    <>{loginUser.state ?
    <HeaderContainer photoURL={loginUser.photoURL}>
      <Link to='/infopage'><h1 className="eng">MLB MANAGEMENT</h1></Link>
      {loginUser.state ? 
      <div className="btns">
        {loginUser.photoURL? <div className="photo" /> : null}
        <p className="hi">{loginUser.name ? loginUser.name : (loginUser.level >= 2 ? '뮤라밸 운영진' : '뮤라밸 회원')}님, 안녕하세요!</p>
        <div className="logout" onClick={() => {
          navigate('/')
          authFunc.logout()
        }}>로그아웃</div>
      </div> : null}
      {modalState ? <MemberModal /> : null}
    </HeaderContainer> : <></>}</>
  )
}

export default Header