import Footer from "../components/common/Footer.tsx"
import { GraphPageContainer, GraphYear } from "../style/graphPageStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import HostRanking from "../components/graphPage/HostRanking.tsx"
import MeetingType from "../components/graphPage/MeetingType.tsx"
import Week from "../components/graphPage/Week.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import BasicStats from "../components/graphPage/BasicStats.tsx"
import { useState } from "react"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { dateCalc } from "../components/common/dateCalc.ts"

const GraphPage = () => {
  const { membersData, meetData, loginUser } = useAppSelector(state => state.membersData)
  const [ yearView, setYearView ] = useState(new Date().getFullYear())
  const [ monthView, setMonthView ] = useState(Number(dateCalc('flatMonth')))
  return (
    <GraphPageContainer>
      <GraphYear>
        <BsArrowLeftCircle onClick={() => {if(yearView > 2017) setYearView(yearView - 1)}}/>
        <p>{yearView}년</p>
        <BsArrowRightCircle onClick={() => {if(yearView < new Date().getFullYear()) setYearView(yearView + 1)}}/>
      </GraphYear>
      <MeetingType meetData={meetData} yearView={yearView} monthView={monthView} setMonthView={setMonthView} />
      {loginUser.level >= 2 ? <BasicStats membersData={membersData} /> : null}

      <HostRanking meetData={meetData} yearView={yearView} monthView={monthView} setMonthView={setMonthView}/>
      <Week meetData={meetData} yearView={yearView} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <ScrollToTopBtn />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage