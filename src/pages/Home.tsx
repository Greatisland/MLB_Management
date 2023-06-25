import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"

const Home = () => {
  return (
    <HomeContainer>
      <BtnList />
      <HomeList />
    </HomeContainer>
  )
}

export default Home