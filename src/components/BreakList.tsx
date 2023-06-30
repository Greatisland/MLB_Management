import { HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember, sortState } from "../store/slice"
import Swal from "sweetalert2"

const BreakList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const breakMembersData = membersData.filter(member => member[1].break)

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
          break: member[1].break || false
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
    <>{loginUser.level >= 2 ?
    <><h3 className="title">휴식기</h3>
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
          {breakMembersData.map((member, i) => (
            <tr key={i} onClick={() => handleAddMember(member)}>
              <td>{member[1].name}</td>
              <td>{member[1].join}</td>
              <td>{member[1].year.slice(2)}</td>
              {loginUser.level >= 2 ?
              <td>{member[1].etc || ''}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer></> :
    <></>}
    </>
  )
}

export default BreakList