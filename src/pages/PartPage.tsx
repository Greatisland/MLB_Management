import PartAward from "../components/part/PartAward.tsx"
import PartList from "../components/part/PartList.tsx"
import PartModal from "../components/part/PartModal.tsx"
import PartResult from "../components/part/PartResult.tsx"
import { PartPageContainer } from "../style/partPageStyled.tsx"                                                
import { useAppSelector } from "../store/hook.ts"
import Footer from "../components/common/Footer.tsx"
import Waiting from "../components/common/Waiting.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"


const PartPage = () => {
  const { modalPartState, loginUser } = useAppSelector(state => state.membersData)

  return (
    <>
    {loginUser.level >= 1 ? 
    <PartPageContainer>
      <PartAward />
      <PartResult />
      <PartList />
      {modalPartState ? <PartModal /> : null}
      <ScrollToTopBtn />
      <Footer />
    </PartPageContainer> :
    <Waiting />}
    </>
  )
}

export default PartPage