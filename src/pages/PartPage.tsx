import PartAward from "../components/PartAward"
import PartList from "../components/PartList"
import PartModal from "../components/PartModal"
import PartResult from "../components/PartResult"
import { PartPageContainer } from "../style/PartPageStyled"
import { useAppSelector } from "../store/hook"

const PartPage = () => {
  const { modalPartState } = useAppSelector(state => state.membersData)
  return (
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
      {modalPartState ? <PartModal /> : null}
    </PartPageContainer>
  )
}

export default PartPage