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
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage