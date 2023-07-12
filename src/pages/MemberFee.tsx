import MemberFeeList from "../components/memberfee/MemberFeeList"
import { MemberFeeContainer } from "../style/memberFeeStyled"
import { dateCalc } from "../components/common/dateCalc"
import MemberFeeBtn from "../components/memberfee/MemberFeeBtn"
import MemberFeeTotal from "../components/memberfee/MemberFeeTotal"
import Footer from "../components/common/Footer"
import { useAppSelector } from "../store/hook"

const MemberFee = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <>
    {loginUser.state ? 
    <MemberFeeContainer>
      <MemberFeeBtn />
      <p className="dateResult"><span>{dateCalc('year')}</span>년<span>{dateCalc('month')}</span>월 <span>{dateCalc('day')}</span>일 회비현황</p>
      <MemberFeeTotal />
      <MemberFeeList />
      <Footer />
    </MemberFeeContainer> :
    <>로그인 안됨!</>}
    </>
  )
}

export default MemberFee