import type { Member } from "../../store/slice"
import { dateCalc } from "./dateCalc"

export const averCheck = (member: Member) => {
  let aver = {total: 0, count: 0, result: 0}

  //가입월 확인
  const thisDate = new Date(member.join)
  const date = new Date()
  let joinMonth = 1
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
  return Math.round((aver.result = aver.total / aver.count) * 10) / 10
}