export const oldFaceCheck = (comeYear: number, comeMonth: number, currentYear: number, currentMonth: number) => {
  return ((comeYear + 1 === currentYear) && (
    comeMonth - 10 >= currentMonth
  )) 
  ||
  (comeYear === currentYear && 
  (comeMonth === currentMonth || comeMonth + 1 === currentMonth || comeMonth + 2 === currentMonth)
  )
}