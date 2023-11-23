export const daysBetweenDates = (date1: Date, date2: Date): number => {
  // 하루는 24시간, 1시간은 60분, 1분은 60초, 1초는 1000밀리초
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000
  
  // 두 날짜의 차이를 밀리초로 계산한 후, 일 수로 변환
  const daysDifference = Math.abs(date2.getTime() - date1.getTime()) / oneDayInMilliseconds
  
  return Math.round(daysDifference)
}