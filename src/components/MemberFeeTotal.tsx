import { MemberFeeTotalContainer } from "../style/memberFeeStyled"
import { useAppSelector } from "../store/hook"

const MemberFeeTotal = () => {
  const { payMemberData } = useAppSelector(state => state.membersData)

  const percent = () => {
    let complete = payMemberData.reduce((acc: number, member) => {
      if(member.properties.납부체크.checkbox){ return acc += 1 }
      return acc
    }, 0)
    return Math.floor((complete / payMemberData.length) * 100)
  }

  const completeTotal = (param: string) => {
    let complete = payMemberData.reduce((acc: number, member) => {
      if(member.properties.납부체크.checkbox){ return acc += 1 }
      return acc
    }, 0)

    if(param === 'done'){
      return (complete * 15000).toLocaleString()
    }else{
      return ((payMemberData.length * 15000) - (complete * 15000)).toLocaleString()
    }
  }
  

  return (
    <MemberFeeTotalContainer>
      <ul className="title">
        <li>납부 완료율</li>
        <li>납부 총계</li>
        <li>미납 총계</li>
      </ul>
      <ul>
        <li>{percent()}%</li>
        <li>₩{completeTotal('done')}</li>
        <li>₩{completeTotal('none')}</li>
      </ul>
    </MemberFeeTotalContainer>
  )
}

export default MemberFeeTotal