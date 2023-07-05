import { HofCardContainer } from "../style/hallOfFameStyled"
import { AiFillYoutube } from 'react-icons/ai';
import type { Hof } from "../store/slice"

const HofCard = ({award} : {award: Hof}) => {
  return (
    <HofCardContainer imgUrl={award.imgUrl}>
      <div className="leftSide">
        <div className="textSide">
          <h3>{award.eventName}</h3>
          <p>{(award.eventDate).replace(/-/g, '.')}</p>
        </div>
        <div className="imgCon"></div>
      </div>

      <ul className="rightSide">
        <li>
          <span>우승</span>
          <p className="name">{award.fClass}</p>
          <p className="track">{award.fTrack}</p>
          {award.fLink ? <a href={award.fLink}>Live<AiFillYoutube /></a> : null}
        </li>
        <li>
          {award.sClass ? (
          <>
          <span>준우승</span>
          <p className="name">{award.sClass}</p>
          <p className="track">{award.sTrack}</p>
          {award.sLink ? <a href={award.sLink}>Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
        <li>
          {award.tClass ? (
          <>
          <span>3등</span>
          <p className="name">{award.tClass}</p>
          <p className="track">{award.tTrack}</p>
          {award.tLink ? <a href={award.tLink}>Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
        <li>
          {award.anotherClass ? (
          <>
          <span>인기상</span>
          <p className="name">{award.anotherClass}</p>
          <p className="track">{award.anotherTrack}</p>
          {award.anotherLink ? <a href={award.anotherLink}>Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
      </ul>
    </HofCardContainer>
  )
}

export default HofCard 