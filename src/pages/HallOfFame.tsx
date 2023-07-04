import Footer from "../components/Footer"
import HofBtnList from "../components/HofBtnList"
import HofList from "../components/HofList"
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
