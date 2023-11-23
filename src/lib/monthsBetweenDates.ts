export const monthsBetweenDates = (date1: Date, date2: Date): number => {
  const earlierDate = date1 < date2 ? date1 : date2
  const laterDate = date1 > date2 ? date1 : date2

  let months = (laterDate.getFullYear() - earlierDate.getFullYear()) * 12
  months -= earlierDate.getMonth()
  months += laterDate.getMonth()

  // 만약 earlierDate의 일(day)이 laterDate의 일(day)보다 크면, 한 달을 뺀다.
  if (earlierDate.getDate() > laterDate.getDate()) {
    months--
  }

  return months
}