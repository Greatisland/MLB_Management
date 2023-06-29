import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/Footer"

const InfoPage = () => {
  return (
    <HomeContainer>
      <BtnList />
      <HomeList />
      <Footer />
    </HomeContainer>
  )
}

export default InfoPage