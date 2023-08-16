import { useAppSelector } from "../../store/hook.ts"
import { dateCalc } from "../common/dateCalc.ts"
import { FaBirthdayCake } from "react-icons/fa";
import { PartAwardContainer } from "../../style/partPageStyled.tsx";

const BirthList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  
  const birthMemberData = membersData.filter((member) => {
    const birthMonth = member[1].birth ? member[1].birth.split('월')[0] : null
    if(birthMonth === dateCalc('month')) return true
  })

  if(birthMemberData.length > 0){return (
    <PartAwardContainer>
      <FaBirthdayCake />
      <p><span className="date">{dateCalc('year')}</span>년 <span className="date">{dateCalc('month')}</span>월 생일인 회원은 <br /><span className="name">{
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