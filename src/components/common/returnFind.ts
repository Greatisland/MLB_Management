import type { MeetData } from "../../store/slice"
export const returnFind = (meetData: MeetData, name: string): string => {
  let result = ''
  for (const [_, data] of meetData) {
    //참석 데이터가 배열일 경우
    if (Array.isArray(data)) {
      //배열을 1차원 배열로 평탄화 후 참석 명단에서 이름 찾기
      const found = data.flat().find(meet => meet && (
        meet?.list?.split(',').find((user: string) => user === name)
      ))

      //이름 찾았으면 최초 참석날짜 저장 후 순회 종료
      if(found) {
        result = found.date
        break
      }
    
    //참석 데이터가 객체일 경우
    } else if (data) {
      //객체를 배열로 변환&평탄화 후 참석 명단에서 이름 찾기
      const found = Object.values(data).flat().find(meet => meet && (
        meet?.list?.split(',').find((user: string) => user === name)
      ))
      //이름 찾았으면 최초 참석날짜 저장 후 순회 종료
      if(found) {
        result = found.date
        break
      }
    }
  }
  const match = result.match(/(\d{4}년 \d{1,2}월 \d{1,2}일)/)
  return match ? match[0] : ''
}