import { HeaderContainer } from "../style/headerStyle"
import BtnList from "./BtnList"
import { useState } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal((param) => !param);
  }
  return (
    <HeaderContainer>
      <h1>MLB Management</h1>
      <BtnList />
      {/* {showModal ? <BtnList closeModal={closeModal} /> : null} */}
    </HeaderContainer>
  )
}

export default Header