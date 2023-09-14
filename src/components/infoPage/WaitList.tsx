import { HomeListContainer } from "../../style/homeStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleModal, sendMember } from "../../store/slice.ts"
import Swal from "sweetalert2"

const WaitList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser, meetData } = useAppSelector(state => state.membersData)
  const waitMembersData = membersData.filter(member => !member[1].join)

  const daysSinceRegistration = (add: string | undefined) => {
    if (!add) {
      throw new Error('Invalid date input')
    }
    const userDate = new Date(add)
    const nowDate = new Date()
    const flattenedDates = Object.values(meetData).flat(2).map(entry => (entry as any).date).filter(val => val)
    return flattenedDates.filter(meet => {
      const formatted = meet.replace('년 ', '-').replace('월 ', '-').split('일')[0]
      const date = new Date(formatted)
      if(
        userDate.getTime() <= date.getTime() &&
        date.getTime() <= nowDate.getTime()
      ){
        return true
      }
    }).length
  }


  const handleAddMember = (member: any) => {
    //레벨 2 이상부터 운영진
    if(loginUser.level >= 2){
      dispatch(toggleModal()), dispatch(sendMember(
        {
          id: member[0],
          name: member[1].name,
          join: member[1].join,
          year: member[1].year,
          birth: member[1].birth || '',
          gender: member[1].gender,
          etc: member[1].etc || '',
          state: true,
          special: member[1].special,
          break: member[1].break || false,
          approval: member[1].approval || false,
          comeback: member[1].comeback || '',
          awardCount: member[1].awardCount || null,
          add: member[1].add || null
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

  if(waitMembersData.length === 0) return null

  return (
    <>{loginUser.level >= 2 ?
    <><h3 className="title">가입대기</h3>
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>{`지나온 벙 갯수`}</th>
            {loginUser.level >= 2 ?
            <th>메모</th>:null}
          </tr>
        </thead>
        <tbody>
          {waitMembersData.map((member, i) => (
            <tr key={i} onClick={() => handleAddMember(member)}>
              <td>{member[1].name}</td>
              <td>{daysSinceRegistration(member[1].add)}</td>
              <td className="tdmemo">{member[1].etc || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer></> :
    <></>}
    </>
  )
}

export default WaitList