import { HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember, sortState } from "../store/slice"
import { useState } from "react"
import { SearchBar, SearchPageContainer } from "../style/searchStyled"

const SearchList = () => {

  const dispatch = useAppDispatch()
  const { membersData } = useAppSelector(state => state.membersData)

  const [ search, setSearch ] = useState('')

  const searchMembersData = membersData.filter(member => member[1].name.includes(search))
  return (
    <SearchPageContainer>
    <HomeListContainer>
      <SearchBar>
        <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."></input>
      </SearchBar>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>이름</th>
            <th onClick={() => {dispatch(sortState('join'))}}>가입일</th>
            <th onClick={() => {dispatch(sortState('year'))}}>년생</th>
            <th onClick={() => {dispatch(sortState('etc'))}}>비고</th>
          </tr>
        </thead>
        <tbody>
          {searchMembersData.map((member, i) => (
            <tr key={i} onClick={() => {dispatch(toggleModal()), dispatch(sendMember(
              {
                id: member[0],
                name: member[1].name,
                join: member[1].join,
                year: member[1].year,
                gender: member[1].gender,
                etc: member[1].etc || '',
                state: true,
                special: member[1].special 
              }
            ))}}>
              <td>{member[1].name}</td>
              <td>{member[1].join}</td>
              <td>{member[1].year}</td>
              <td>{member[1].etc || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer>
    </SearchPageContainer>
  )
}

export default SearchList