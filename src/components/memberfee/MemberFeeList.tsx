import { CheckState, MemberFeeListContainer, MembersTarget } from "../../style/memberFeeStyled.tsx"
import { useAppSelector } from "../../store/hook.ts"
import { useState, useEffect } from "react";
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { dbFunc } from "../../firebase/firebaseFunc.ts";
import { dateCalc } from "../../lib/dateCalc.ts";
import Swal from "sweetalert2";
import type { Member } from "../../store/slice.ts";

const MemberFeeList = () => {
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const [payMembers, setPayMembers] = useState<[string, Member][]>([]);
  const [noPayMembers, setNoPayMembers] = useState<[string, Member][]>([]);
  const [newFace, setNewFace] = useState<[string, Member][]>([]);

  useEffect(() => {
    const filteredPayMembers  = membersData.filter(member => {
      let memberJoin = new Date(member[1].join)
      let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
      let joinYear = String(memberJoin.getFullYear())
  
      if(member[1].special === '' && member[1].target === '' && !member[1].break && member[1].join && !(joinYear === dateCalc('year') && joinMonth === dateCalc('month'))){
        return true
      }
    }).sort((a, b) => {
      let aName = a[1].name
      let bName = b[1].name
      return aName < bName ? -1 : (aName > bName ? 1 : 0)
    }).sort((a, b) => {
      let aTarget = a[1].pay ? 2 : 1
      let bTarget = b[1].pay ? 2 : 1
      return aTarget - bTarget
    })
    setPayMembers(filteredPayMembers)
  
    const filteredNoPayMembers = membersData.filter(member => {
      if(member[1].special || member[1].target === '기타' || member[1].break){
        return true
      }
    }).sort((a, b) => {
      let aTarget = a[1].special ? ( a[1].special === '모임장' ? 1 : 2 ) : 3
      let bTarget = b[1].special ? ( b[1].special === '모임장' ? 1 : 2 ) : 3
      return aTarget - bTarget 
    }).sort((a, b) => {
      let aTarget = a[1].special ? 1 : 2
      let bTarget = b[1].special ? 1 : 2
      return aTarget - bTarget 
    })
    setNoPayMembers(filteredNoPayMembers)
  
    const filteredNewFace = membersData.filter(member => {
      let memberJoin = new Date(member[1].join)
      let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
      let joinYear = String(memberJoin.getFullYear())
  
      if(member[1].target === '' && joinYear === dateCalc('year') && joinMonth === dateCalc('month')){
        return true
      }
    })
    setNewFace(filteredNewFace)
  }, [membersData])

  const handleSwitching = (member: any, param: string) => {
    if(loginUser.level >= 3){
      Swal.fire({
        title: `${param === '기타' ? 
        member[1].name + '님을 회비에서 제외시킬까요?' :
        member[1].name + '님을 회비에 포함시킬까요?'}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e99797',
        cancelButtonColor: '#4ec6e4',
        confirmButtonText: '네. 변경할게요.',
        cancelButtonText: '아뇨. 안바꿀게요.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '변경완료',
            html: `
            ${member[1].name}님의 회비 상태가 변경되었어요!!
            `,
            showConfirmButton: false,
            timer: 1000
          })
        dbFunc.updateMember(member[0], {target: param})
        }else{return}
      })

    } else {
      Swal.fire({
        icon: 'warning',
        title: '총무 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  const handlePay = (member: any) => {
    if(loginUser.level >= 3){
      const sendPay = member[1].pay
      dbFunc.updateMember(member[0], {pay: !sendPay})
    } else {
      Swal.fire({
        icon: 'warning',
        title: '총무 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  return (
    <>
    {loginUser.level >= 1 ?
    <MemberFeeListContainer>
      <MembersTarget>
        <p>회비대상</p>
        {payMembers.map((member, i) => (
          <div className="member" key={i}>
            <ul onClick={() => handlePay(member)}>
              <li>{loginUser.level >= 2 ? member[1].name : '***'}</li>
              <CheckState state={member[1]?.pay ? member[1].pay.toString() : 'false'}>{member[1].pay ? '완료!' : '미완료'}</CheckState>
            </ul>
            <span>
              <TiUserDelete onClick={() => handleSwitching(member, '기타')} />
            </span>
          </div>
        ))}
      </MembersTarget>

      <MembersTarget>
        <p>회비제외</p>
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
              <li>{member[1].special ? member[1].special : (member[1].break ? '휴식기' : '기타')}</li>
            </ul>
            {
              member[1].special !== '모임장' && member[1].special !== '운영진' && !member[1].break && member[1].target === '기타' ? 
              <span><TiUserAdd onClick={() => handleSwitching(member, '')} /></span> : null
            }
          </div>
        ))}
      </MembersTarget>
    </MemberFeeListContainer> :
    null}
    </>

  )
}

export default MemberFeeList