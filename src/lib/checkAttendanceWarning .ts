import type { Member } from "../store/type"
import { getTotalAttendance } from "./getTotalAttendance"

export const checkAttendanceWarning = (member: Member) => {
  const totalAttendance = getTotalAttendance(member)
  const currentDate = new Date()
  const joinDate = new Date(member.join)
  const comebackDate = member.comeback ? new Date(member.comeback) : null

  // 가입일 또는 복귀일 이후 3개월 이상 지났는지 확인
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate())
  const isEligibleForWarning = comebackDate
    ? comebackDate <= threeMonthsAgo
    : joinDate <= threeMonthsAgo

  return isEligibleForWarning && totalAttendance < 5
}