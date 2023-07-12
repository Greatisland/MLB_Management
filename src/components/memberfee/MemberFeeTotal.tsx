import { MemberFeeTotalContainer } from "../../style/memberFeeStyled"
import { useAppSelector } from "../../store/hook"
import { dateCalc } from "../common/dateCalc";
import { FaCoins } from 'react-icons/fa';
import { GiCoins } from 'react-icons/gi';
import { RiHandCoinLine } from 'react-icons/ri';


const MemberFeeTotal = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  let payMembers = membersData.filter(member => {
    let memberJoin = new Date(member[1].join)
    let joinMonth = String(memberJoin.getMonth() + 1).padStart(2,'0')
    let joinYear = String(memberJoin.getFullYear())

    //차례대로,
    //면제 사유 없고 && 운영진 아니고 && 휴식기 아니고 && 신입 아닐 때
    if(member[1].target === '' && !member[1].special && !member[1].break && !(joinYear === dateCalc('year') && joinMonth === dateCalc('month'))){
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
        <li><RiHandCoinLine />납부 완료율</li>
        <li><GiCoins />납부 총계</li>
        <li><FaCoins />미납 총계</li>
      </ul>
      <ul>
        <li>{percent()}<span>%</span></li>
        <li><span>₩</span>{completeTotal('done')}</li>
        <li><span>₩</span>{completeTotal('none')}</li>
      </ul>
    </MemberFeeTotalContainer>
  )
}

export default MemberFeeTotal