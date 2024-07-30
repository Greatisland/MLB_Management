import type { Member } from "../store/type.ts"

export const hotCount = (yearView: number, monthView: number, member: Member, page?: boolean) => {
  const date = new Date()
  const currentYear = page? date.getFullYear(): yearView
  const currentMonth = page? date.getMonth() + 1: monthView

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