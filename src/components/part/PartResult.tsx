import { useAppSelector } from "../../store/hook"
import { PartResultContainer } from "../../style/partPageStyled"
import { useState, useEffect } from "react"
import { dateCalc } from "../common/dateCalc"
import type { Member } from "../../store/slice"

const PartResult = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let [ rising, setRising ] = useState<[string, Member][]>([])
  let [ hosting, setHosting ] = useState<[string, Member][]>([])

  //평균률 확인
  const averCheck = (member) => {
    let aver = {total: 0, count: 0, result: 0}

    //가입월 확인
    const thisDate = new Date(member.join)
    const date = new Date()
    let joinMonth = 0
    if(thisDate.getFullYear() === date.getFullYear()){
      joinMonth = thisDate.getMonth() + 1
    }
  
    //계산
    for (let i = joinMonth; i <= Number(dateCalc('flatMonth')); i++) {
      const monthValue = member[`${i}month` as keyof Member]
      aver.total += (monthValue ? Number(monthValue) : 0)
      aver.count++
    }
    
    //평균값이 첫재 소수점까지만 보이도록 
    return Math.floor((aver.result = aver.total / aver.count) * 10) / 10
  }

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
      let newMember = [member[0], {...member[1]}]
      newMember[1].aver = averCheck(newMember[1])
      return newMember
    }).sort((a, b) => {
      return (b[1].aver || 0) - (a[1].aver || 0)
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
        <li>최고의 신입</li>
        <li>최고의 벙주</li>
      </ul>
      <ul>
        <li>{rising[0] && rising[0][1] ? `${rising[0][1].name} - 평균 ${rising[0][1].aver}회` : 'N/A'}</li>
        <li>{hosting[0] && hosting[0][1] ? `${hosting[0][1].name} - ${hosting[0][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[1] && rising[1][1] ? `${rising[1][1].name} - 평균 ${rising[1][1].aver}회` : 'N/A'}</li>
        <li>{hosting[1] && hosting[1][1] ? `${hosting[1][1].name} - ${hosting[1][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
      <ul>
        <li>{rising[2] && rising[2][1] ? `${rising[2][1].name} - 평균 ${rising[2][1].aver}회` : 'N/A'}</li>
        <li>{hosting[2] && hosting[2][1] ? `${hosting[2][1].name} - ${hosting[2][1].totalHost}회 개설!` : 'N/A'}</li>
      </ul>
    </PartResultContainer>
  )
}

export default PartResult