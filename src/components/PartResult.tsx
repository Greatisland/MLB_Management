import { useAppSelector } from "../store/hook"
import { PartResultContainer } from "../style/PartPageStyled"
import { useState, useEffect } from "react"
import { dateCalc } from "./dateCalc"

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState([])
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
        <li>최고의 신입</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
      {rising.map((member, i) => (
        <li key={i}>{member[1].name}</li>
      ))}
      </ul>
      <ul>
        <li>미구현</li>
        <li>미구현</li>
      </ul>
      <ul>
        <li>미구현</li>
        <li>미구현</li>
      </ul>
    </PartResultContainer>
  )
}

export default PartResult