import BtnList from "../components/BtnList"
import Footer from "../components/Footer"
import SearchList from "../components/SearchList"
import { useAppSelector } from "../store/hook"
import { HomeContainer } from "../style/homeStyled"

const SearchPage = () => {
  const { loginUser } = useAppSelector(state => state.membersData)

  return (
    <>
    {loginUser.state ? 
    <HomeContainer>
      <BtnList />
      <SearchList />
      <Footer />
    </HomeContainer> :
    <></>}
    </>
  )
}

export default SearchPage