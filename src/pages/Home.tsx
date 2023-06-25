import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"
import { dbFunc } from "../firebase/firebaseFunc"
import { useEffect } from "react"
const Home = () => {
  const member = {
    name: '김시득',
    year: '1999',
    gender: '남'
  }
  useEffect(() => {
    dbFunc.addMember(member)
  }, [])
  return (
    <HomeContainer>
      <BtnList />
      <HomeList />
    </HomeContainer>
  )
}

export default Home