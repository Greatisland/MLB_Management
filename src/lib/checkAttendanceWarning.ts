// import type { Member } from "../store/type"
// import { getTotalAttendance } from "./getTotalAttendance"

// export const checkAttendanceWarning = (member: Member) => {
//   const totalAttendance = getTotalAttendance(member)
//   const currentDate = new Date()
//   const joinDate = new Date(member.join)
//   const comebackDate = member.comeback ? new Date(member.comeback) : null

//   // 가입일 또는 복귀일 이후 3개월 이상 지났는지 확인
//   const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate())
//   const isEligibleForWarning = comebackDate
//     ? comebackDate <= threeMonthsAgo
//     : joinDate <= threeMonthsAgo

//   return isEligibleForWarning && totalAttendance < 5
// }

import type { Member } from "../store/type"
import { getTotalAttendance } from "./getTotalAttendance"

export const checkAttendanceWarning = (yearView:number, monthView:number, member: Member) => {
  const totalAttendance = getTotalAttendance(yearView, monthView, member)
  const currentDate = new Date()
  const joinDate = new Date(member.join)
  const comebackDate = member.comeback ? new Date(member.comeback) : null

  // 현재 날짜에서 월 단위로 3개월 전으로 설정
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1)

  // 가입일 또는 복귀일 이후 3개월 이상 지났는지 월 단위로 확인
  const isEligibleForWarning = comebackDate
    ? (comebackDate.getFullYear() < threeMonthsAgo.getFullYear() || 
       (comebackDate.getFullYear() === threeMonthsAgo.getFullYear() && 
        comebackDate.getMonth() <= threeMonthsAgo.getMonth()))
    : (joinDate.getFullYear() < threeMonthsAgo.getFullYear() || 
       (joinDate.getFullYear() === threeMonthsAgo.getFullYear() && 
        joinDate.getMonth() <= threeMonthsAgo.getMonth()))

  return isEligibleForWarning && totalAttendance < 5
}
