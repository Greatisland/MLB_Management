import BtnList from "../components/common/BtnList.tsx"
import HomeList from "../components/home/HomeList.tsx"
import BreakList from "../components/home/BreakList.tsx"
import BanList from "../components/home/BanList.tsx"
import PenddingList from "../components/home/PenddingList.tsx"
import { HomeContainer } from "../style/homeStyled.tsx"
import Footer from "../components/common/Footer.tsx"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import BirthList from "../components/home/BirthList.tsx"


const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)

  return (<>
    {loginUser.level >= 1 ? 
      <HomeContainer>
        <BtnList />
        <PenddingList />
        <BirthList />
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