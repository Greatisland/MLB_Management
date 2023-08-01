import type { Member } from "../../store/slice"
import { dateCalc } from "./dateCalc"

export const averCheck = (member: Member) => {

  //핵심계산
  const calc = (param: Date) => {
    const date = new Date()
    let aver = {total: 0, count: 0, result: 0}
    let joinMonth = 1
    if(param.getFullYear() === date.getFullYear()){
      joinMonth = param.getMonth() + 1
    }
  
    //계산
    for (let i = joinMonth; i <= Number(dateCalc('flatMonth')); i++) {
      const monthValue = member[`${i}month` as keyof Member]
      aver.total += (monthValue ? Number(monthValue) : 0)
      aver.count++
    }

    //평균값이 첫재 소수점까지만 보이도록 
    return Math.round((aver.result = aver.total / aver.count) * 10) / 10
  }

  const joinDate = new Date(member.join)

  //북귀자일 경우
  if(member.comeback){
    const comeDate = new Date(member.comeback)
    //복귀 이전 벙참석횟수 기록이 있을 경우 대소를 구분해 큰 쪽을 평균으로 리턴
    return calc(joinDate) > calc(comeDate) ? calc(joinDate) : calc(comeDate)
  }
  return calc(joinDate)
}