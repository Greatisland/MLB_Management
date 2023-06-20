import { HeaderContainer } from "../style/headerStyle"
import BtnList from "./BtnList"
import MemberModal from "./MemberModal";
import { useAppSelector } from "../store/hook";

const Header = () => {
  const { modalState } = useAppSelector(state => state.membersData)

  return (
    <HeaderContainer>
      <h1>MLB Management</h1>
      <BtnList/>
      {modalState ? <MemberModal /> : null}
    </HeaderContainer>
  )
}

export default Header