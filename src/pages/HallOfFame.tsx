import Footer from "../components/common/Footer.tsx"
import HofBtnList from "../components/hof/HofBtnList.tsx"
import HofList from "../components/hof/HofList.tsx"
import { HallOfFameContainer } from "../style/hallOfFameStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import GfIcon from "../components/common/GfIcon.tsx"


const HallOfFame = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
      <HallOfFameContainer>
      <HofBtnList />
      <HofList />
      <ScrollToTopBtn />
      <Footer />
      <GfIcon />
    </HallOfFameContainer> 
  )
}

export default HallOfFame
