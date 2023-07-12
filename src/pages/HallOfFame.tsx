import Footer from "../components/common/Footer"
import HofBtnList from "../components/hof/HofBtnList"
import HofList from "../components/hof/HofList"
import { HallOfFameContainer } from "../style/hallOfFameStyled"

const HallOfFame = () => {
  return (
    <HallOfFameContainer>
      <HofBtnList />
      <HofList />
      <Footer />
    </HallOfFameContainer>
  )
}

export default HallOfFame
