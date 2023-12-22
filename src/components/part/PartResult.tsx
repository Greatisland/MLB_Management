import { useAppSelector } from "../../store/hook.ts"
import { PartResultContainer } from "../../style/partPageStyled.tsx"
import { useState, useEffect } from "react"
import { dateCalc } from "../../lib/dateCalc.ts"
import { averCheck } from "../../lib/averCheck.ts"
import { totalCalcFunc } from "../../lib/totalCalcFunc.ts"
import type { Member } from "../../store/slice.ts"

interface NewProp {
  aver: number
}

const PartResult = () => {
  const { membersData, yearView } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState<(Member & NewProp)[]>([])
  let [ hosting, setHosting ] = useState<[string, Member][]>([])

  useEffect(() => {
    let filterMember = [...membersData].filter((member) => {
      let memberJoin = new Date(member[1].join)
      let joinMonth = memberJoin.getMonth() + 1
      let joinYear = String(memberJoin.getFullYear())
      if(joinYear === dateCalc('year') && (
        Number(joinMonth) >= (Number(dateCalc('flatMonth')) - 2)
      )){return member}
    }).map(member => {
      // 새로운 객체를 생성하여 원본 데이터를 수정하지 않도록 함
      let newMember: Member & NewProp = {...member[1], aver: 0}
      newMember.aver = averCheck(newMember, yearView)
      return newMember
    }).sort((a, b) => {
      return (b.aver || 0) - (a.aver || 0)
    })
1
    let filterMemberHost = [...membersData].sort((a, b) => {
      return (totalCalcFunc(b[1], new Date().getFullYear()).host || 0) - (totalCalcFunc(a[1], new Date().getFullYear()).host || 0)
    })
    setRising(filterMember.slice(0, 3))
    setHosting(filterMemberHost.slice(0, 3))
  }, [membersData])

  return (
    <PartResultContainer>
      <ul className="title">
        <li>최고의 신입</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
        <li>{rising[0] ? <>{rising[0].name} <span>평균 {rising[0].aver}회</span></> : 'N/A'}</li>
        <li>{hosting[0] && hosting[0][1] ? <>{hosting[0][1].name} <span>{totalCalcFunc(hosting[0][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[1] ? <>{rising[1].name} <span>평균 {rising[1].aver}회</span></> : 'N/A'}</li>
        <li>{hosting[0] && hosting[1][1] ? <>{hosting[1][1].name} <span>{totalCalcFunc(hosting[1][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[2] ? <>{rising[2].name} <span>평균 {rising[2].aver}회</span></> : 'N/A'}</li>
        <li>{hosting[0] && hosting[2][1] ? <>{hosting[2][1].name} <span>{totalCalcFunc(hosting[2][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
      </ul>
    </PartResultContainer>
  )
}

export default PartResult