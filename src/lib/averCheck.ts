import type { Member } from "../store/type.ts"
import { dateCalc } from "./dateCalc.ts"

export const averCheck = (member: Member, year: number) => {

  //핵심계산
  const calc = (param: Date) => {
    // const date = new Date()
    let aver = {total: 0, count: 0, result: 0}
    let joinMonth = 1
    // if(param.getFullYear() === date.getFullYear()){
    if(param.getFullYear() === year){
      joinMonth = param.getMonth() + 1
    }

    //계산
    for (let i = joinMonth; i <= Number(dateCalc('flatMonth')); i++) {
      // const monthValue = member[`${i}month` as keyof Member]
      const monthValue = member.attend ? (member.attend[year]?.[i] || 0) : 0
      aver.total += (monthValue ? Number(monthValue) : 0)
      aver.count++
    }

    //평균값이 첫재 소수점까지만 보이도록 
    return Math.round((aver.result = aver.total / (aver.count || 1)) * 10) / 10
  }

  const joinDate = new Date(member.join)

  //복귀자일 경우
  if(member.comeback){
    const comeDate = new Date(member.comeback)
    //복귀 이전 벙참석횟수 기록이 있을 경우 대소를 구분해 큰 쪽을 평균으로 리턴
    return calc(joinDate) > calc(comeDate) ? calc(joinDate) : calc(comeDate)
  }
  return calc(joinDate)
}