import PartAward from "../components/PartAward"
import PartList from "../components/PartList"
import PartModal from "../components/PartModal"
import PartResult from "../components/PartResult"
import { PartPageContainer } from "../style/PartPageStyled"

const PartPage = () => {
  return (
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
      <PartModal />
    </PartPageContainer>
  )
}

export default PartPage