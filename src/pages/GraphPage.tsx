import Footer from "../components/common/Footer.tsx"
import { GraphPageContainer } from "../style/graphPageStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import HostRanking from "../components/graphPage/HostRanking.tsx"
import LatestHostRanking from "../components/graphPage/LatestHostRanking.tsx"
import MeetingType from "../components/graphPage/MeetingType.tsx"
import Week from "../components/graphPage/Week.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"

const GraphPage = () => {
  const { membersData, meetData } = useAppSelector(state => state.membersData)

  return (
    <GraphPageContainer>
      <MeetingType meet={meetData} />
      <Week meet={meetData} />
      <HostRanking members={membersData} />
      <LatestHostRanking members={membersData} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <ScrollToTopBtn />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage