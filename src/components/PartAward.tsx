import { PartAwardContainer } from "../style/PartPageStyled"
import { GiPartyPopper } from 'react-icons/gi';
const PartAward = () => {
  return (
    <PartAwardContainer>
      <GiPartyPopper />
      <p><span className="date">2023</span>년 <span className="date">06</span>월 현재 최고의 프로벙참러는 <span className="name">김현진</span> 님입니다!</p>
      <GiPartyPopper />
    </PartAwardContainer>
  )
}

export default PartAward