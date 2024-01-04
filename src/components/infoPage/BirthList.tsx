import { useAppSelector } from "../../store/hook.ts"
import { dateCalc } from "../../lib/dateCalc.ts"
import { FaBirthdayCake } from "react-icons/fa";
import { PartAwardContainer } from "../../style/partPageStyled.tsx";
import { useState } from "react";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
const BirthList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  const [month, setMonth] = useState(Number(dateCalc('flatMonth') as string))
  
  //다음달 생일자 명단
  const handleBirthMember = (param : number) => {
    const totalMember = membersData.filter(member => !member[1].break && member[1].join)
    return totalMember.filter((member) => {
      const birthMonth = member[1].birth ? member[1].birth.split('월')[0] : null
      if(Number(birthMonth) === param) return true
    })
  }

  let birthMemberData = handleBirthMember(month);

  const handleMonth = (param: number) => {
    if(month <= 1 && param === -1) {
      setMonth(12)
    }else if(month >= 12 && param === 1){
      setMonth(1)
    }else{
      setMonth(month + param)
    }
  }
  
  const arrowStyle = {
    minWidth: '2rem',
    cursor: 'pointer'
  }

  return (
    <PartAwardContainer>
      <IoMdArrowDropleftCircle style={arrowStyle} onClick={() => handleMonth(-1)}/>
      <p>{month === Number(dateCalc('flatMonth')) ? '이번 달 ' : '다가오는 '}
        <span className="date">{month.toString().padStart(2,'0')}</span>
        월 <span className="name">생일</span>인 회원은 
        {birthMemberData.length > 0 ?
        <> <span>{
        birthMemberData.map((member, i) => (
          <span className='name' key={i}>{i !== 0 ? ', ': null}{member[1]?.name}</span>
        ))}
        </span> 님입니다! </> : ' 존재하지 않거나 찾을 수 없습니다.'
        }
      </p>
      <IoMdArrowDroprightCircle style={arrowStyle} onClick={() => handleMonth(+1)}/>
    </PartAwardContainer>
  )
}

export default BirthList