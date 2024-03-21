import type { Member } from "../store/type.ts"

export const hotCount = (member: Member) => {
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  const preAttend = member.attend?.[currentYear - 1] || {}
  const attend = member.attend?.[currentYear] || {}

  const check = (month: number) => {
    if(month <= 0){
      return preAttend[`${month + 12}`]
    }
    return attend[`${month}`]
  }

  return (check(currentMonth) + check(currentMonth - 1) + check(currentMonth -2))
}