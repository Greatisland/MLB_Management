import MemberFeeList from "../components/MemberFeeList"
import { MemberFeeContainer } from "../style/memberFeeStyled"
import { dateCalc } from "../components/dateCalc"
import MemberFeeBtn from "../components/MemberFeeBtn"
import MemberFeeTotal from "../components/MemberFeeTotal"
import Footer from "../components/Footer"
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
    <></>}
    </>
  )
}

export default MemberFee