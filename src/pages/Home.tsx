import BtnList from "../components/common/BtnList"
import HomeList from "../components/home/HomeList"
import BreakList from "../components/home/BreakList"
import BanList from "../components/home/BanList"
import PenddingList from "../components/home/PenddingList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/common/Footer"
import { useAppSelector } from "../store/hook"
import Waiting from "../components/common/Waiting"


const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)

  return (<>
    {loginUser.level >= 1 ? 
      <HomeContainer>
        <BtnList />
        <PenddingList />
        <HomeList />
        <BreakList />
        <BanList />
        <Footer />
      </HomeContainer> :
      <Waiting />}
  </>
  )
}

export default Home