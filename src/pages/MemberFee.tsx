import MemberFeeList from "../components/MemberFeeList"
import { MemberFeeContainer } from "../style/memberFeeStyled"
import { dateCalc } from "../components/dateCalc"
import MemberFeeBtn from "../components/MemberFeeBtn"
import MemberFeeTotal from "../components/MemberFeeTotal"

const MemberFee = () => {
  return (
    <MemberFeeContainer>
      <MemberFeeBtn />
      <p className="dateResult"><span>{dateCalc('year')}</span>년<span>{dateCalc('month')}</span>월 <span>{dateCalc('day')}</span>일 회비현황</p>
      <MemberFeeTotal />
      <MemberFeeList />
    </MemberFeeContainer>
  )
}

export default MemberFee