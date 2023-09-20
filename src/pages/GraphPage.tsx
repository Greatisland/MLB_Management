import Footer from "../components/common/Footer.tsx"
import { GraphPageContainer } from "../style/graphPageStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import HostRanking from "../components/graphPage/HostRanking.tsx"
import MeetingType from "../components/graphPage/MeetingType.tsx"
import Week from "../components/graphPage/Week.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import BasicStats from "../components/graphPage/BasicStats.tsx"
import GraphArrow from "../components/common/GraphArrow.tsx"

const GraphPage = () => {
  const { meetData } = useAppSelector(state => state.membersData)
  return (
    <GraphPageContainer>
      <GraphArrow isMonth={true}/>
      <MeetingType meetData={meetData} />
      <HostRanking meetData={meetData} />
      <BasicStats />
      <Week meetData={meetData} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <ScrollToTopBtn />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage