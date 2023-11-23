import { dateCalc } from "./dateCalc"
import type { Member } from "../store/slice"

export const hasPrize = {
  first (member: Member) {
    const currentYear = Number(dateCalc('year'))
    const currentMonth = Number(dateCalc('flatMonth'))
    if (member.host) {
      // 년도 키 검사
      for (let year in member.host) {
        const yearInt = parseInt(year);
        if (yearInt < currentYear) {
          return false; // 현재 년도 이전의 데이터가 존재하는 경우
        } else if (yearInt === currentYear) {
          // 현재 년도의 경우, 월 검사
          for (let month in member.host[yearInt]) {
            if (parseInt(month) < currentMonth) {
              return false; // 현재 월 이전의 데이터가 존재하는 경우
            }
          }
        }
      }
  
      // 현재 년도와 월에 해당하는 데이터가 존재하는지 확인
      if (member.host[currentYear] && member.host[currentYear][currentMonth]) {
        return true; // 현재 년도와 월의 값이 존재함
      }
    }
  
    return false; // host가 없거나 현재 년도와 월의 값이 없음
  },
  sing (meetData: any) {
    const currentYear = dateCalc('year')
    const currentMonth = dateCalc('flatMonth')
    const that = meetData.find((data: any) => data[0] === currentYear)
    if(that){
      const monthBungs = that[1][Number(currentMonth)]
      const prize = monthBungs.filter((bung: any) => bung.type === '노래벙' && (bung.list.split(',').length >= 5))
      if(prize){
        const hosts = prize.map((bung: any) => {
          return bung.host
        })
        return hosts
      }
    }
  }
}