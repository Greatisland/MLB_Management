import BtnList from "../components/common/BtnList.tsx"
import HomeList from "../components/infoPage/HomeList.tsx"
import BreakList from "../components/infoPage/BreakList.tsx"
import BanList from "../components/infoPage/BanList.tsx"
import PenddingList from "../components/infoPage/PenddingList.tsx"
import { HomeContainer } from "../style/homeStyled.tsx"
import Footer from "../components/common/Footer.tsx"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import BirthList from "../components/infoPage/BirthList.tsx"
import CheckBirth from "../components/infoPage/CheckBirth.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import WaitList from "../components/infoPage/WaitList.tsx"
import GfIcon from "../components/common/GfIcon.tsx"

const InfoPage = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  
  return (<>
    {loginUser.level >= 1 ? 
      <HomeContainer>
        <BtnList />
        <PenddingList />
        <BirthList />
        <CheckBirth />
        <HomeList />
        <WaitList />
        <BreakList />
        <BanList />
        <ScrollToTopBtn />
        <Footer />
        <GfIcon />
      </HomeContainer> :
      <Waiting />}
  </>
  )
}

export default InfoPage