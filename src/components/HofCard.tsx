import { HofCardContainer } from "../style/hallOfFameStyled"
import type { Hof } from "../store/slice"


const HofCard = ({award} : {award: Hof}) => {
  console.log(award.imgUrl)
  console.log(decodeURIComponent(award.imgUrl))

  return (
    <HofCardContainer imgUrl={award.imgUrl}>
      <div className="leftSide">
        <div className="textSide">
          <h3>{award.eventName}</h3>
          <p>{award.eventDate}</p>
        </div>

        <div className="imgCon"></div>
      </div>

      <div className="rightSide">
        <span>우승</span>
        <p>{award.fClass}</p>
        <span>준우승</span>
        <p>{award.sClass}</p>
        <span>3등</span>
        <p>{award.sClass}</p>
        <span>인기상</span>
        <p>{award.anotherClass}</p>
      </div>
    </HofCardContainer>
  )
}

export default HofCard 