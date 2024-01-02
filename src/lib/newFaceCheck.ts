import { dateCalc } from "./dateCalc"

export const newFaceCheck = (joinYear: number, joinMonth: number) => {
  return ((joinYear + 1) === Number(dateCalc('year')) && (
    (joinMonth - 10) >= Number(dateCalc('flatMonth'))
  )) ||
  (joinYear === Number(dateCalc('year')) && (
    joinMonth >= (Number(dateCalc('flatMonth')) - 2)
  ))
}