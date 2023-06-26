import { CheckState, MemberFeeListContainer, MembersTarget } from "../style/memberFeeStyled"
import { useAppSelector } from "../store/hook"
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { dbFunc } from "../firebase/firebaseFunc";
import { dateCalc } from "./dateCalc";

const MemberFeeList = () => {
  const { membersData } = useAppSelector(state => state.membersData)

  let payMembers = membersData.filter(member => {
    let memberJoin = new Date(member[1].join)
    let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
    let joinYear = String(memberJoin.getFullYear())

    if(member[1].target === '' && !(joinYear === dateCalc('year') && joinMonth === dateCalc('month'))){
      return true
    }
  }).sort((a, b) => {
    let aTarget = a[1].pay ? 2 : 1
    let bTarget = b[1].pay ? 2 : 1
    return aTarget - bTarget
  })

  let noPayMembers = membersData.filter(member => {
    if(member[1].special || member[1].target === '기타'){
      return true
    }
  }).sort((a, b) => {
    let aTarget = a[1].special ? a[1].special === '모임장' ? 1 : 2 : 3
    let bTarget = a[1].special ? b[1].special === '모임장' ? 1 : 2 : 3
    return aTarget - bTarget 
  })

  let newFace = membersData.filter(member => {
    let memberJoin = new Date(member[1].join)
    let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
    let joinYear = String(memberJoin.getFullYear())

    if(member[1].target === '' && joinYear === dateCalc('year') && joinMonth === dateCalc('month')){
      return true
    }
  })

  return (
    <MemberFeeListContainer>
      <MembersTarget>
        <p>회비대상자</p>
        {payMembers.map((member, i) => (
          <div className="member" key={i}>
            <ul onClick={() => {
              const sendPay = member[1].pay
              dbFunc.updateMember(member[0], {pay: !sendPay})
            }}>
              <li>{member[1].name}</li>
              <CheckState state={member[1]?.pay ? member[1].pay.toString() : 'false'}>{member[1].pay ? '완료!' : '미완료'}</CheckState>
            </ul>
            <span>
              <TiUserDelete onClick={() => {dbFunc.updateMember(member[0], {target: '기타'})}} />
            </span>
          </div>
        ))}
      </MembersTarget>

      <MembersTarget>
        <p>회비제외자</p>
        {newFace.map((member, i) => (
          <div className="member" key={i}>
            <ul>
              <li>{member[1].name}</li>
              <li>{dateCalc('month')}월 신입</li>
            </ul>
          </div>
        ))}
        {noPayMembers.map((member, i) => (
          <div className="member" key={i}>
            <ul>
              <li>{member[1].name}</li>
              <li>{member[1].special ? member[1].special : '기타'}</li>
            </ul>
            {
              member[1].target === '기타' ? 
              <span><TiUserAdd onClick={() => {dbFunc.updateMember(member[0], {target: ''})}} /></span> : null
            }
          </div>
        ))}
      </MembersTarget>
    </MemberFeeListContainer>
  )
}

export default MemberFeeList