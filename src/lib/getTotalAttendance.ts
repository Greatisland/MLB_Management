import type { Member } from "../store/type"

export const getTotalAttendance = (yearView: number, monthView:number, member: Member) => {
  // const date = new Date()
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  const year = yearView
  const month = monthView

  let totalAttend = 0

  // 최근 3개월 간의 참석 정보를 확인
  for (let i = 0; i < 3; i++) {
    const targetYear = month - i <= 0 ? year - 1 : year
    const targetMonth = month - i <= 0 ? 12 + (month - i) : month - i

    if (member?.attend && member.attend[targetYear] && member.attend[targetYear][targetMonth]) {
      totalAttend += member.attend[targetYear][targetMonth]
    }
  }

  return totalAttend
}
