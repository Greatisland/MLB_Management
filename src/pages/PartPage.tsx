import PartAward from "../components/PartAward"
import PartList from "../components/PartList"
import PartResult from "../components/PartResult"
import { PartPageContainer } from "../style/PartPageStyled"

const PartPage = () => {
  return (
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
    </PartPageContainer>
  )
}

export default PartPage