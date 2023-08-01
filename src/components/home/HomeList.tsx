import { HomeListContainer, StyledFaCrown, StyledFaStar } from "../../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../../store/hook"
import { toggleModal, sendMember, sortState } from "../../store/slice"
import { SearchBarPart } from "../../style/partPageStyled"
import { useState } from "react"
import Swal from "sweetalert2"

const HomeList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const [ search, setSearch ] = useState('')

  //가입 승인상태이고 휴식기가 아닐 때
  const searchMembersData = membersData.filter(member => member[1]?.name?.includes(search) && !member[1].break)

  const handleAddMember = (member: any) => {
    //레벨 2 이상부터 운영진
    if(loginUser.level >= 2){
      dispatch(toggleModal()), dispatch(sendMember(
        {
          id: member[0],
          name: member[1].name,
          join: member[1].join,
          year: member[1].year,
          gender: member[1].gender,
          etc: member[1].etc || '',
          state: true,
          special: member[1].special,
          break: member[1].break || false,
          approval: member[1].approval || false,
          comeback: member[1].comeback || ''
        }
      ))
    } else {
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 회원정보 수정이 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  return (
    <>
    <SearchBarPart onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."></input>
    </SearchBarPart>
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>정렬 | 이름</th>
            <th onClick={() => {dispatch(sortState('join'))}}>가입일</th>
            <th onClick={() => {dispatch(sortState('year'))}}>년생</th>
            {loginUser.level >= 2 ?
            <th onClick={() => {dispatch(sortState('etc'))}}>메모</th>:null}
          </tr>
        </thead>
        <tbody>
          {searchMembersData.map((member, i) => (
            <tr key={i} onClick={() => handleAddMember(member)}>
              <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null
              }{member[1].name}</td>
              <td>{member[1].join.replace(/-/g, '.').slice(2)}</td>
              <td>{member[1].year.slice(2)}</td>
              {loginUser.level >= 2 ?
              <td>{member[1].etc || ''}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer>
    </>
  )
}

export default HomeList