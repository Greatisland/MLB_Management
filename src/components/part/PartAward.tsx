import { useAppSelector } from "../../store/hook.ts";
import { PartAwardContainer } from "../../style/partPageStyled.tsx"
import { GiPartyPopper } from 'react-icons/gi';
import { dateCalc } from "../../lib/dateCalc.ts";

const PartAward = () => {

  const { membersData } = useAppSelector(state => state.membersData)

  const date = new Date()
  const currentYear = date.getFullYear()

  //체고의 프로벙참러!!
  let gloryName = ''
  let monthCount = 0
  membersData.map(member => {
    let monthPart = (member[1] as any)?.attend?.[currentYear]?.[`${dateCalc('flatMonth')}`]
    if(monthPart) {
      if(monthCount < monthPart){
        monthCount = monthPart
        gloryName = member[1].name

      //공동수상 발생할 경우
      }else if(monthCount === monthPart){
        gloryName += `, ${member[1].name}`
      }
    }
  })

  return (
    <PartAwardContainer>
      <GiPartyPopper />
      <p><span className="date">{dateCalc('year')}</span>
      년 <span className="date">{dateCalc('month')}</span>
      월 현재 최고의 프로벙참러는 <span className="name partName">{gloryName}</span> 님입니다!</p>
      <GiPartyPopper />
    </PartAwardContainer>
  )
}

export default PartAward