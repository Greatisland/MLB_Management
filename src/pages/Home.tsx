import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"
import { useEffect } from "react"
import { useAppDispatch } from "../store/hook"
import { getMembersData } from "../store/slice"

const Home = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMembersData())
  },[])

  return (
    <HomeContainer>
     <HomeList />
    </HomeContainer>
  )
}

export default Home