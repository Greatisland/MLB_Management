import type { Member } from "../store/type.ts"

export const totalyAttend = (totalMember: [string, Member][]) => {
  const total = totalMember.reduce((acc, member) => {
    if(member[1].attend){
      const data = Object.values(member[1].attend).map(val => Object.values(val)).flat()
      const result = data.reduce((memberAcc, att) => {
        return memberAcc + att
      }, 0)
      const aver = result / data.length
      return acc + aver
    }else{
      return acc
    }
  }, 0)
  return Math.round(total / totalMember.length*100) / 100
}