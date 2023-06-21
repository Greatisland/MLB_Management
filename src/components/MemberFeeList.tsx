import { CheckState, MemberFeeListContainer, MembersTarget } from "../style/memberFeeStyled"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { payMemberToggle, payCheckToggle, sortPayState } from "../store/slice"
import { useEffect } from "react";

const MemberFeeList = () => {
  const dispatch = useAppDispatch()
  const { payMemberData, noPayMemberData } = useAppSelector(state => state.membersData)
  
  const payToggle = (member: any, add: boolean) => {
    dispatch(payMemberToggle({member, add}))
  }

  const checkToggle = (member: any) => {
    dispatch(payCheckToggle(member))
  }

  useEffect(() => {
    dispatch(sortPayState())
  }, [payMemberData, noPayMemberData])

  return (
    <MemberFeeListContainer>
      <MembersTarget>
        <p>회비대상자</p>
        {payMemberData.map((member, i) => (
          <div className="member" key={i}>
            <ul onClick={() => {checkToggle(member)}}>
              <li>{member.properties.이름.title[0].plain_text}</li>
              <CheckState state={member.properties.납부체크.checkbox.toString()}>{member.properties.납부체크.checkbox ? '완료!' : '미완료'}</CheckState>
            </ul>
            <span>
              <TiUserDelete onClick={() => {payToggle(member, false)}} />
            </span>
          </div>
        ))}
      </MembersTarget>

      <MembersTarget>
        <p>회비제외자</p>
        {noPayMemberData.map((member, i) => (
          <div className="member" key={i}>
            <ul>
              <li>{member.properties.이름.title[0].plain_text}</li>
              <li>{member.properties.회비대상.rich_text[0] ? member.properties.회비대상.rich_text[0].plain_text === '' ? '기타' : member.properties.회비대상.rich_text[0].plain_text : '기타'}</li>
            </ul>
            {
              member.properties.회비대상.rich_text[0] ? 
              member.properties.회비대상.rich_text[0].plain_text === '운영진' || member.properties.회비대상.rich_text[0].plain_text === '신입' ?
              null : 
              <span><TiUserAdd onClick={() => {payToggle(member, true)}} /></span> :
              <span><TiUserAdd onClick={() => {payToggle(member, true)}} /></span>
            }
          </div>
        ))}
      </MembersTarget>
    </MemberFeeListContainer>
  )
}

export default MemberFeeList