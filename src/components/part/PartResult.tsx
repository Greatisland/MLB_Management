import { useAppSelector } from "../../store/hook"
import { PartResultContainer } from "../../style/partPageStyled"
import { useState, useEffect } from "react"
import { dateCalc } from "../common/dateCalc"
import type { Member } from "../../store/slice"

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState<[string, Member][]>([])
  let [ hosting, setHosting ] = useState<[string, Member][]>([])

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

    let filterMemberHost = [...membersData].sort((a, b) => {
      return (b[1].totalHost || 0) - (a[1].totalHost || 0)
    })
    setRising(filterMember.slice(0, 3))
    setHosting(filterMemberHost.slice(0, 3))
  }, [membersData])

  return (
    <PartResultContainer>
      <ul className="title">
        <li>최고의 신입 유망주</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
        <li>{rising[0] && rising[0][1] ? `${rising[0][1].name} - ${rising[0][1].total}회 참석!` : 'N/A'}</li>
        <li>{hosting[0] && hosting[0][1] ? `${hosting[0][1].name} - ${hosting[0][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[1] && rising[1][1] ? `${rising[1][1].name} - ${rising[1][1].total}회 참석!` : 'N/A'}</li>
        <li>{hosting[1] && hosting[1][1] ? `${hosting[1][1].name} - ${hosting[1][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[2] && rising[2][1] ? `${rising[2][1].name} - ${rising[2][1].total}회 참석!` : 'N/A'}</li>
        <li>{hosting[2] && hosting[2][1] ? `${hosting[2][1].name} - ${hosting[2][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
    </PartResultContainer>
  )
}

export default PartResult