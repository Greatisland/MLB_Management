import MemberFeeList from "../components/memberfee/MemberFeeList.tsx"
import { MemberFeeContainer } from "../style/memberFeeStyled.tsx"
import { dateCalc } from "../lib/dateCalc.ts"
import MemberFeeBtn from "../components/memberfee/MemberFeeBtn.tsx"
import MemberFeeTotal from "../components/memberfee/MemberFeeTotal.tsx"
import Footer from "../components/common/Footer.tsx"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import PrizeList from "../components/memberfee/PrizeList.tsx"


const MemberFee = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <MemberFeeContainer>
      <MemberFeeBtn />
      <p className="dateResult"><span>{dateCalc('year')}</span>년<span>{dateCalc('month')}</span>월 <span>{dateCalc('day')}</span>일 회비현황</p>
      <MemberFeeTotal />
      {/* <PrizeList /> */}
      <MemberFeeList />
      <ScrollToTopBtn />
      <Footer />
    </MemberFeeContainer>
  )
}

export default MemberFee