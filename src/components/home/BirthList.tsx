import { useAppSelector } from "../../store/hook.ts"
import { dateCalc } from "../common/dateCalc.ts"
import { FaBirthdayCake } from "react-icons/fa";
import { PartAwardContainer } from "../../style/partPageStyled.tsx";

const BirthList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  
  //다음달 생일자 명단
  const birthMemberData = membersData.filter((member) => {
    const birthMonth = member[1].birth ? member[1].birth.split('월')[0] : null
    if(Number(birthMonth) === Number(dateCalc('month')) + 1) return true
  })

  if(birthMemberData.length > 0){return (
    <PartAwardContainer>
      <FaBirthdayCake />
      <p>다가오는 <span className="date">{((Number(dateCalc('month')) + 1)).toString().padStart(2,'0')}</span>월 생일인 회원은 <br /><span className="name">{
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