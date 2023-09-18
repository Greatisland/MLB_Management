import Footer from "../components/common/Footer.tsx"
import { GraphPageContainer } from "../style/graphPageStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import HostRanking from "../components/graphPage/HostRanking.tsx"
import MeetingType from "../components/graphPage/MeetingType.tsx"
import Week from "../components/graphPage/Week.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import BasicStats from "../components/graphPage/BasicStats.tsx"

const GraphPage = () => {
  const { membersData, meetData, loginUser } = useAppSelector(state => state.membersData)

  return (
    <GraphPageContainer>
      <MeetingType meetData={meetData} />
      {loginUser.level >= 2 ? <BasicStats meetData={meetData} membersData={membersData}/> : null}

      <HostRanking membersData={membersData} />
      <Week meetData={meetData} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <ScrollToTopBtn />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage