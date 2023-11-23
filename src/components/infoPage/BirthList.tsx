import { useAppSelector } from "../../store/hook.ts"
import { dateCalc } from "../../lib/dateCalc.ts"
import { FaBirthdayCake } from "react-icons/fa";
import { PartAwardContainer } from "../../style/partPageStyled.tsx";

const BirthList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  
  //다음달 생일자 명단
  const handleBirthMember = (param : number) => {
    return membersData.filter((member) => {
      const birthMonth = member[1].birth ? member[1].birth.split('월')[0] : null
      if(Number(birthMonth) === param) return true
    })
  }
  let monthCount = Number(dateCalc('flatMonth')) + 1
  let birthMemberData = handleBirthMember(monthCount)

  while(birthMemberData.length === 0 && monthCount <= 12){
    monthCount++
    birthMemberData = handleBirthMember(monthCount)
  }

  if(birthMemberData.length > 0){return (
    <PartAwardContainer>
      <FaBirthdayCake />
      <p>다가오는 <span className="date">{monthCount.toString().padStart(2,'0')}</span>월 생일인 회원은 <span className="name">{
      birthMemberData.map((member, i) => (
        <span className='name' key={i}>{i !== 0 ? ',': null} {member[1]?.name}</span>
      ))
      }</span> 님입니다!</p>
      <FaBirthdayCake />
    </PartAwardContainer>
  )}else{
    return null
  }

}

export default BirthList