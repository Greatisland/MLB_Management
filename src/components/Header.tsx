import { HeaderContainer } from "../style/headerStyle"
import BtnList from "./BtnList"
import { useState } from "react";
import JoinModal from "./JoinModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal((param) => !param);
  }
  return (
    <HeaderContainer>
      <h1>MLB Management</h1>
      <BtnList />
      {/* {showModal ? <JoinModal closeModal={closeModal} /> : null} */}
    </HeaderContainer>
  )
}

export default Header