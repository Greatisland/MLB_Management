import { MemberFeeTotalContainer } from "../style/memberFeeStyled"
import { useAppSelector } from "../store/hook"
import { dateCalc } from "./dateCalc";

const MemberFeeTotal = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let payMembers = membersData.filter(member => {
    let memberJoin = new Date(member[1].join)
    let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
    let joinYear = String(memberJoin.getFullYear())

    if(member[1].target === '' && !member[1].special && !(joinYear === dateCalc('year') && joinMonth === dateCalc('month'))){
      return true
    }
  })

  const percent = () => {
    let complete = payMembers.reduce((acc: number, member) => {
      if(member[1].pay){ return acc += 1 }
      return acc
    }, 0)
    const percentage = Math.floor((complete / payMembers.length) * 100)
    return isNaN(percentage) ? 0 : percentage
  }

  const completeTotal = (param: string) => {
    let complete = payMembers.reduce((acc: number, member) => {
      if(member[1].pay){ return acc += 1 }
      return acc
    }, 0)

    if(param === 'done'){
      return (complete * 15000).toLocaleString()
    }else{
      return ((payMembers.length * 15000) - (complete * 15000)).toLocaleString()
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