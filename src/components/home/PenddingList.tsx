import { HomeListContainer } from "../../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../../store/hook"
import { toggleModal, sendMember, sortState } from "../../store/slice"
import { SearchBarPart } from "../../style/partPageStyled"
import { useState } from "react"
import Swal from "sweetalert2"
import { dbFunc } from "../../firebase/firebaseFunc"

const PenddingList = () => {
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()
  const penddingMembersData = membersData.filter(member => !member[1].approval)
  // penddingMembersData.forEach(member => dbFunc.removeMember(member[0]))
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
          approval: member[1].approval
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
  return (<>
    {penddingMembersData.length !== 0 ? 
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th>회원 대기자</th>
          </tr>
        </thead>
        <tbody>
          {penddingMembersData.map((member, i) => (
            <tr key={i} onClick={() => handleAddMember(member)}>
              <td>{member[1].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer> : null}</>
  )
}

export default PenddingList