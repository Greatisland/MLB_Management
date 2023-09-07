import Footer from "../components/common/Footer"
import { GraphPageContainer } from "../style/graphPageStyled"
import { useAppSelector } from "../store/hook"
import GraphAttend from "../components/graphPage/GraphAttend"
import GraphPersonal from "../components/graphPage/GraphPersonal"
import GraphMeeting from "../components/graphPage/GraphMeeting"
import HostRanking from "../components/graphPage/HostRanking"

const GraphPage = () => {
  const { membersData } = useAppSelector(state => state.membersData)

  return (
    <GraphPageContainer>
      <HostRanking members={membersData} />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage