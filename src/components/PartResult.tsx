import { useAppSelector } from "../store/hook"
import { PartResultContainer } from "../style/PartPageStyled"
import { useState, useEffect } from "react"
import { dateCalc } from "./dateCalc"
import type { Member } from "../store/slice"

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState<[string, Member][]>([])

  useEffect(() => {
    let filterMember = [...membersData].filter((member) => {
      let memberJoin = new Date(member[1].join)
      let joinMonth = memberJoin.getMonth() + 1
      let joinYear = String(memberJoin.getFullYear())
      if(joinYear === dateCalc('year') && (
        Number(joinMonth) >= (Number(dateCalc('flatMonth')) - 2)
      )){return member}
    }).sort((a, b) => {
      return (b[1].total || 0) - (a[1].total || 0)
    })
    setRising(filterMember.slice(0, 3))
  }, [membersData])

  return (
    <PartResultContainer>
      <ul className="title">
        <li>최고의 신입 유망주</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
        <li>{rising[0] && rising[0][1] ? `${rising[0][1].name} - ${rising[0][1].total}회 참석!` : 'N/A'}</li>
        <li>미구현</li>
      </ul>
      <ul>
        <li>{rising[1] && rising[1][1] ? `${rising[1][1].name} - ${rising[1][1].total}회 참석!` : 'N/A'}</li>
        <li>미구현</li>
      </ul>
      <ul>
        <li>{rising[2] && rising[2][1] ? `${rising[2][1].name} - ${rising[2][1].total}회 참석!` : 'N/A'}</li>
        <li>미구현</li>
      </ul>
    </PartResultContainer>
  )
}

export default PartResult