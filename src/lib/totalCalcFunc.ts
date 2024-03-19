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

    // 원본의 불변성을 유지하기 위해 새 객체 생성
    let attend: {[key: string]: {[key: number]: number}} = JSON.parse(JSON.stringify(member.attend))

    // // 원본 att 객체의 값을 새 객체에 복사
    // Object.entries(member.attend).forEach((data) => {
    //   const [year, month] = data
    //   attend[year] = month
    // })

    const joinTime = new Date(member.join)
    const comeTime = new Date(member.comeback || 0)

    // 각 연도에 대해 1월부터 12월까지 모든 월이 존재하도록 보장
    Object.keys(attend).forEach((yearKey) => {
      const year = parseInt(yearKey)
      const date = new Date()
      // 가입일 및 복귀일에 따라 그 전 일자는 통계에서 빼야 함

      let startMonth = 1
      let lastMonth = 12

      // 가입년도는 가입시점부터 통계포함
      if(joinTime.getFullYear() === year) startMonth = joinTime.getMonth() + 1
      // 복귀년도는 복귀시점부터 통계포함
      if(comeTime.getFullYear() === year) startMonth = comeTime.getMonth() + 1
      // 현재 년도는 현재까지 통계포함
      if(date.getFullYear() === year) lastMonth = date.getMonth() + 1

      for(startMonth; startMonth <= lastMonth; startMonth++){
        if(attend[year]){
          attend[year][startMonth] = attend[year][startMonth] || 0 // 해당 월의 데이터가 없으면 0으로 설정
        }
      }
    })

    const data = Object.values(attend).map(val => Object.values(val)).flat()
    .filter(val => val !== null)
    result.total = data.reduce((acc, att) => acc + att, 0);
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