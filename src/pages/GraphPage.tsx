import Footer from "../components/common/Footer"
import { GraphPageContainer } from "../style/graphPageStyled"
import { useAppSelector } from "../store/hook"
import HostRanking from "../components/graphPage/HostRanking"
import LatestHostRanking from "../components/graphPage/LatestHostRanking"

const GraphPage = () => {
  const { membersData } = useAppSelector(state => state.membersData)

  return (
    <GraphPageContainer>
      <LatestHostRanking members={membersData} />
      <HostRanking members={membersData} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage