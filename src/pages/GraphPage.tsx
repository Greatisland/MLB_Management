import Footer from "../components/Footer"
import { GraphPageContainer } from "../style/graphPageStyled"
import { useAppSelector } from "../store/hook"
import GraphAttend from "../components/GraphAttend"
import GraphMeeting from "../components/GraphMeeting"

const GraphPage = () => {
  const { membersData } = useAppSelector(state => state.membersData)

  return (
    <GraphPageContainer>
      <GraphAttend members={membersData} />
      <p>1월부터 현재까지 매달 개설된 벙숫자 그래프 추가예정</p>
      <p>신입&이탈자 그래프 추가예정</p>
      {/* <GraphMeeting members={membersData} /> */}
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage