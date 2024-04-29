import type { Member } from "../store/type"

export const latestAver = (member: Member) => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  let totalAttend = 0

  // 최근 3개월 간의 참석 정보를 확인
  for (let i = 0; i < 3; i++) {
    const targetYear = month - i <= 0 ? year - 1 : year
    const targetMonth = month - i <= 0 ? 12 + (month - i) : month - i

    if (member.attend && member.attend[targetYear] && member.attend[targetYear][targetMonth]) {
      totalAttend += member.attend[targetYear][targetMonth]
    }
  }

  // 평균 참석률 계산 (최근 3개월)
  const averageAttend = Math.round((totalAttend / 3) * 10) / 10

  return averageAttend
}