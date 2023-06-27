import { useAppSelector } from "../store/hook"
import { PartResultContainer } from "../style/PartPageStyled"
import { useState, useEffect } from "react"

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  const [ yearList, setYearList ] = useState<any[]>([])
  useEffect(() => {
    setYearList(
      [...membersData].sort((a, b) => {
        return (Number(b[1].total)) - (Number(a[1].total))
      })
    )
  }, [membersData])

  return (
    <PartResultContainer>
      <ul className="title">
        <li>명예의 전당 - 가요제 우승</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
        <li>미구현</li>
        <li>미구현</li>
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