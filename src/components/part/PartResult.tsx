import { useAppSelector } from "../../store/hook.ts"
import { PartResultContainer } from "../../style/partPageStyled.tsx"
import { useState, useEffect } from "react"
import { totalCalcFunc } from "../../lib/totalCalcFunc.ts"
import { newFaceCheck } from "../../lib/newFaceCheck.ts"
import type { Member } from "../../store/type.ts"

interface NewProp {
  aver: number
}

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState<any>([])
  let [ hosting, setHosting ] = useState<[string, Member][]>([])
  const date = new Date()
  const currentYear = date.getFullYear()

  useEffect(() => {
    let filterMember = [...membersData].filter((member) => {
      let memberJoin = new Date(member[1].join)
      let joinMonth = memberJoin.getMonth() + 1
      let joinYear = memberJoin.getFullYear()
      if(newFaceCheck(joinYear, joinMonth)){return member}
    }).map(member => {
      // 새로운 객체를 생성하여 원본 데이터를 수정하지 않도록 함
      let newMember: Member & NewProp = {...member[1], aver: 0}
      newMember.aver = totalCalcFunc(newMember, currentYear).aver
      return newMember
    }).sort((a, b) => {
      return (b.aver || 0) - (a.aver || 0)
    }).filter(member => member.attend?.[currentYear])

    
1
    let filterMemberHost = [...membersData].sort((a, b) => {
      return (totalCalcFunc(b[1], currentYear).host || 0) - (totalCalcFunc(a[1], currentYear).host || 0)
    }).filter(member => member[1]?.host?.[currentYear])

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
        {rising[0] ?
        <li>{rising[0] ? <>{rising[0].name} <span>평균 {rising[0].aver}회</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
        {hosting[0] ?
        <li>{hosting[0] && hosting[0][1] ? <>{hosting[0][1].name} <span>{totalCalcFunc(hosting[0][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
      </ul>
      <ul>
        {rising[1] ?
        <li>{rising[1] ? <>{rising[1].name} <span>평균 {rising[1].aver}회</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
        {hosting[1] ?
        <li>{hosting[0] && hosting[1][1] ? <>{hosting[1][1].name} <span>{totalCalcFunc(hosting[1][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
      </ul>
      <ul>
        {rising[2] ?
        <li>{rising[2] ? <>{rising[2].name} <span>평균 {rising[2].aver}회</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
        {hosting[2] ?
        <li>{hosting[0] && hosting[2][1] ? <>{hosting[2][1].name} <span>{totalCalcFunc(hosting[2][1], new Date().getFullYear()).host}회 개설!</span></> : 'N/A'}</li>
        :
        <li>---</li>
        }
      </ul>
    </PartResultContainer>
  )
}

export default PartResult