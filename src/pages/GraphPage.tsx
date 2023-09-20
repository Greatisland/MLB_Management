import Footer from "../components/common/Footer.tsx"
import { GraphPageContainer, GraphBtn } from "../style/graphPageStyled.tsx"
import { useAppSelector } from "../store/hook.ts"
import HostRanking from "../components/graphPage/HostRanking.tsx"
import MeetingType from "../components/graphPage/MeetingType.tsx"
import Week from "../components/graphPage/Week.tsx"
import ScrollToTopBtn from "../components/common/ScrollToTopBtn.tsx"
import BasicStats from "../components/graphPage/BasicStats.tsx"
import { useState } from "react"
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

import { dateCalc } from "../components/common/dateCalc.ts"

const GraphPage = () => {
  const { membersData, meetData, loginUser } = useAppSelector(state => state.membersData)
  const [ yearView, setYearView ] = useState(new Date().getFullYear())
  const [ monthView, setMonthView ] = useState(Number(dateCalc('flatMonth')))
  return (
    <GraphPageContainer>
      <GraphBtn>
        <div className="year">
          <BiLeftArrow onClick={() => {
            if(yearView > 2017) {
              setYearView(yearView - 1)
          }}}/>
          <p>{yearView}년</p>
          <BiRightArrow onClick={() => {
            if(yearView < new Date().getFullYear()) {
              setYearView(yearView + 1)
          }}}/>
        </div>
        <div className="month">
          <BiLeftArrow onClick={() => {
            if (monthView > 1) {
              setMonthView(monthView - 1)
            }else if(monthView === 1){
              if(yearView > 2017) {
                setYearView(yearView - 1)
                setMonthView(12)
              }
            }
          }}/>
          <p>{monthView}월</p>
          <BiRightArrow onClick={() => {
            if (monthView < 12) {
              setMonthView(monthView + 1)
            }else if(monthView === 12){
              if(yearView < new Date().getFullYear()) {
                setYearView(yearView + 1)
                setMonthView(1)
              }
            }
          }}/>
        </div>
      </GraphBtn>
      <MeetingType meetData={meetData} yearView={yearView} monthView={monthView} />
      <HostRanking meetData={meetData} yearView={yearView} monthView={monthView} />
      {loginUser.level >= 2 ? <BasicStats membersData={membersData} yearView={yearView} /> : null}
      <Week meetData={meetData} yearView={yearView} />
      <p className="notice">* 통계 그래프는 필요한 통계가 있을 경우 지속적으로 추가 예정입니다. *</p>
      <ScrollToTopBtn />
      <Footer />
    </GraphPageContainer>
  )
}

export default GraphPage