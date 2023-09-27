export const totalCalcFunc = (member: any, yearView: number) => {
  let result = {
    total : 0,
    aver: 0,
    host: 0
  }
  if(member && member.attend){
    const att = member?.attend?.[yearView]
    const host = member?.host?.[yearView]

    if(att) {
      result.total = Object.values(att).reduce((acc: number, val: any) => acc + Number(val), 0)
      result.aver = Math.round(result.total / Object.values(att).length * 10) / 10
    }
    if(host) {
      result.host = Object.values(host).reduce((acc: number, val: any) => acc + Number(val), 0)
    }
  }
  return result
}