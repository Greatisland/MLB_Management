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
      {modalState ? <MemberModal /> : null}
    </HeaderContainer>
  )
}

export default Header