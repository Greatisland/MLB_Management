import Footer from "../components/common/Footer"
import HofBtnList from "../components/hof/HofBtnList"
import HofList from "../components/hof/HofList"
import { HallOfFameContainer } from "../style/hallOfFameStyled"
import { useAppSelector } from "../store/hook"
import Waiting from "../components/common/Waiting"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn"


const HallOfFame = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <>{loginUser.level >= 1 ? 
      <HallOfFameContainer>
      <HofBtnList />
      <HofList />
      <ScrollToTopBtn />
      <Footer />
    </HallOfFameContainer> : <Waiting />
    }
    </>
  )
}

export default HallOfFame
