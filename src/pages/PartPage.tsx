import PartAward from "../components/PartAward"
import PartList from "../components/PartList"
import PartModal from "../components/PartModal"
import PartResult from "../components/PartResult"
import { PartPageContainer } from "../style/partPageStyled"
import { useAppSelector } from "../store/hook"
import Footer from "../components/Footer"

const PartPage = () => {
  const { modalPartState } = useAppSelector(state => state.membersData)
  return (
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
      {modalPartState ? <PartModal /> : null}
      <Footer />
    </PartPageContainer>
  )
}

export default PartPage