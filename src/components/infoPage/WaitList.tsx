import { HomeListContainer } from "../../style/homeStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleModal, sendMember } from "../../store/slice.ts"
import Swal from "sweetalert2"

const WaitList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser, meetData } = useAppSelector(state => state.membersData)
  const waitMembersData = membersData.filter(member => !member[1].join)

  const daysSinceRegistration = (add: string | undefined) => {
    //신입초대날짜가 없을 경우 0 반환
    if (!add) {
      return 0
    }
    const userDate = new Date(add)
    const nowDate = new Date()

    //벙 리스트 날짜값만 가진 배열로 평탄화
    const flattenedDates = Object.values(meetData).flat(3).map(entry => (entry as any).date).filter(val => val)

    //신입 초대날짜 ~ 현재까지 존재한 벙 갯수 반환
    const result = flattenedDates.filter(meet => {
      const formatted = meet.replace('년 ', '/').replace('월 ', '/').split('일')[0]
      const date = new Date(formatted)
      if(
        userDate.getTime() <= date.getTime() &&
        date.getTime() <= nowDate.getTime()
      ){
        return true
      }
    })
    return result.length
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
          add: member[1].add || new Date().toISOString()
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