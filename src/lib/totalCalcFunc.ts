import type { Member } from "../store/slice"
// export const totalCalcFunc = (member: Member, yearView: number) => {
//   let result = {
//     total : 0,
//     aver: 0,
//     host: 0
//   }
//   if(member && member.attend){
//     const att = member?.attend?.[yearView]
//     const host = member?.host?.[yearView]

//     if(att) {
//       result.total = Object.values(att).reduce((acc: number, val: any) => acc + Number(val), 0)
//       result.aver = Math.round(result.total / Object.values(att).length * 10) / 10
//     }
//     if(host) {
//       result.host = Object.values(host).reduce((acc: number, val: any) => acc + Number(val), 0)
//     }
//   }
//   return result
// }

export const totalCalcFunc = (member: Member, yearView: number) => {
  let result = {
    total : 0,
    aver: 0,
    host: 0,
    totalHost: 0
  }

  if(member.attend){
    const data = Object.values(member.attend).map(val => Object.values(val)).flat()
    result.total = data.reduce((memberAcc, att) => {
      return memberAcc + att
    }, 0)
    result.aver = Math.round(result.total / data.length * 10)/10
  }

  if(member?.host?.[yearView]){
    result.host = Object.values(member?.host?.[yearView]).reduce((acc: number, val: any) => acc + Number(val), 0)
  }
  
  if(member.host){
    const hostData = Object.values(member.host).map(val => Object.values(val)).flat()
    result.totalHost = hostData.reduce((memberAcc, att) => {
      return memberAcc + att
    }, 0)
  }

  return result
}