import { HeaderContainer } from "../style/headerStyle"
import MemberModal from "./MemberModal";
import { useAppSelector } from "../store/hook";

const Header = () => {
  const { modalState } = useAppSelector(state => state.membersData)

  return (
    <HeaderContainer>
      <h1>MLB MANAGEMENT</h1>
      {modalState ? <MemberModal /> : null}
    </HeaderContainer>
  )
}

export default Header