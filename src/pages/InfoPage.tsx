import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/Footer"
import { useAppSelector } from "../store/hook"

const InfoPage = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <>
    {loginUser.state ? 
    <HomeContainer>
      <BtnList />
      <HomeList />
      <Footer />
    </HomeContainer> :
    <></>}
    </>

  )
}

export default InfoPage