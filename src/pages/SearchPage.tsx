import BtnList from "../components/BtnList"
import SearchList from "../components/SearchList"
import { HomeContainer } from "../style/homeStyled"

const SearchPage = () => {
  return (
    <HomeContainer>
      <BtnList />
      <SearchList />
    </HomeContainer>
  )
}

export default SearchPage