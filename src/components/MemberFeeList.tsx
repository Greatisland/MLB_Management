import { MemberFeeListContainer, MembersTarget } from "../style/memberFeeStyled"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { TiUserAdd, TiUserDelete } from 'react-icons/ti';
import { payMemberToggle, payCheckToggle } from "../store/slice"

const MemberFeeList = () => {
  const dispatch = useAppDispatch()
  const { payMemberData, noPayMemberData } = useAppSelector(state => state.membersData)
  
  const payToggle = (member: any, add: boolean) => {
    dispatch(payMemberToggle({member, add}))
  }

  const checkToggle = (member: any) => {
    dispatch(payCheckToggle(member))
  }

  return (
    <MemberFeeListContainer>
      <MembersTarget>
        <p>회비대상자</p>
        {/* <ul className="title">
          <li>이름</li>
          <li>납부유무</li>
          <li className="lastBtn">제외하기</li>
        </ul> */}
        {payMemberData.map((member, i) => (
          <div className="member" key={i}>
            <ul onClick={() => {checkToggle(member)}}>
              <li>{member.properties.이름.title[0].plain_text}</li>
              <li>{member.properties.납부체크.checkbox ? '납부완료!' : '미완료'}</li>
            </ul>
            <span>
              <TiUserDelete onClick={() => {payToggle(member, false)}} />
            </span>
          </div>
        ))}
      </MembersTarget>

      <MembersTarget>
        <p>회비제외자</p>
        {/* <ul className="title">
          <li>이름</li>
          <li>제외 사유</li>
          <li className="lastBtn">추가하기</li>
        </ul> */}
        {noPayMemberData.map((member, i) => (
          <div className="member" key={i}>
            <ul>
              <li>{member.properties.이름.title[0].plain_text}</li>
              <li>{member.properties.회비대상.rich_text[0] ? member.properties.회비대상.rich_text[0].plain_text : '기타'}</li>
            </ul>
            <span>
              <TiUserAdd onClick={() => {payToggle(member, true)}} />
            </span>
          </div>
        ))}
      </MembersTarget>
    </MemberFeeListContainer>
  )
}

export default MemberFeeList