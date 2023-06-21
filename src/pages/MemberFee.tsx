import MemberFeeList from "../components/MemberFeeList"
import { MemberFeeContainer } from "../style/memberFeeStyled"
import { dateCalc } from "../components/dateCalc"
import MemberFeeBtn from "../components/MemberFeeBtn"

const MemberFee = () => {
  return (
    <MemberFeeContainer>
      <MemberFeeBtn />
      <p>{dateCalc('year')}년 {dateCalc('month')}월 {dateCalc('day')}일 회비현황</p>
      <MemberFeeList />
    </MemberFeeContainer>
  )
}

export default MemberFee