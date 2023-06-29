import { HeaderContainer } from "../style/headerStyle"
import MemberModal from "./MemberModal";
import { useAppSelector } from "../store/hook";
import { Link } from "react-router-dom";
import { authFunc } from "../firebase/firebaseFunc";

const Header = () => {
  const { modalState } = useAppSelector(state => state.membersData)

  return (
    <HeaderContainer>
      <Link to='/'><h1 className="eng">MLB MANAGEMENT</h1></Link>
      <div className="btns">
      <div onClick={() => authFunc.stateAccount()}>확인</div>
      <div onClick={() => console.log('xxx')}>먼데</div>
      <div onClick={() => {authFunc.logout(), console.log('sex')}}>로그아웃</div>
      {/* <div onClick={() => authFunc.loginGoogle()}>구글 로그인</div> */}
      {/* <div onClick={() => authFunc.joinFacebook()}>페북 로그인</div> */}
      </div>
      {modalState ? <MemberModal /> : null}
    </HeaderContainer>
  )
}

export default Header