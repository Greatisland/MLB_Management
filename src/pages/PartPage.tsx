import PartAward from "../components/part/PartAward"
import PartList from "../components/part/PartList"
import PartModal from "../components/part/PartModal"
import PartResult from "../components/part/PartResult"
import { PartPageContainer } from "../style/partPageStyled"
import { useAppSelector } from "../store/hook"
import Footer from "../components/common/Footer"

const PartPage = () => {
  const { modalPartState, loginUser } = useAppSelector(state => state.membersData)

  return (
    <>
    {loginUser.state ? 
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
      {modalPartState ? <PartModal /> : null}
      <Footer />
    </PartPageContainer> :
    <>로그인 안됨!</>}
    </>
  )
}

export default PartPage