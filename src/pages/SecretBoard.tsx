import Footer from "../components/Footer"
import SecretBoardBtn from "../components/SecretBoardBtn"
import SecretBoardList from "../components/SecretBoardList"
import SecretBoardView from "../components/SecretBoardView"
import SecretBoardWrite from "../components/SecretBoardWrite"
import { SecretBoardContainer } from "../style/secretBoardStyled"
const SecretBoard = () => {
  return (
    <SecretBoardContainer>
      <SecretBoardBtn />
      <SecretBoardList />
      <SecretBoardView />
      <SecretBoardWrite />
      <Footer />
    </SecretBoardContainer>
  )
}

export default SecretBoard