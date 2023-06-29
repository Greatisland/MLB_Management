import BtnList from "../components/BtnList"
import Footer from "../components/Footer"
import SearchList from "../components/SearchList"
import { HomeContainer } from "../style/homeStyled"

const SearchPage = () => {
  return (
    <HomeContainer>
      <BtnList />
      <SearchList />
      <Footer />
    </HomeContainer>
  )
}

export default SearchPage