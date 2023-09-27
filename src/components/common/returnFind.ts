import type { MeetData } from "../../store/slice"
// export const returnFind = (meetData: MeetData, name: string) => {
//   let date = ''
//   meetData.some(value => {
//     //데이터가 배열인 경우
//     let result: any = 0
//     if(Array.isArray(value[1])){
//       //최초 참석 찾기
//       result = value[1].find(meet => {
//         meet.host.includes(name)
//       })
//     //데이터가 단독 객체인 경우
//     }else{
//       if(value[1].host.includes(name)){
//         result = value[1]
//       }
//     }
//     //값을 찾았을 경우
//     if(result || result !== -1){
//       //최초 벙 참석 날짜를 저장 후 순회 종료
//       date = result.date
//       return true
//     }else{
//       return false
//     }
//   })
//   return date
// }

export const returnFind = (meetData: MeetData, name: string): string => {
  for (const [_, data] of meetData) {
    if (Array.isArray(data)) {
      const found = data.find(meet => meet && meet.list.includes(name));
      if (found) return found.date;
    } else if (data && data.list.includes(name)) {
      return data.date;
    }
  }
  return '';
}