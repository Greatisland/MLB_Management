import { HofCardContainer, StyledSwiper } from "../../style/hallOfFameStyled"
import { AiFillYoutube } from 'react-icons/ai';
import type { Hof } from "../../store/slice"
import { SwiperSlide } from "swiper/react";
import 'swiper/css';

interface Props {
  onClick: () => void
  award: Hof
}
const HofCard = ({award, onClick} : Props) => {
  return (
    
    <HofCardContainer>

      <div className="leftSide">
        <div className="textSide" onClick={onClick}>
          <h3>{award.eventName}</h3>
          <p>{(award.eventDate).replace(/-/g, '.')}</p>
        </div>
        <div className="swiper_container">
          <StyledSwiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            $imgurl={award.imgUrl}
            $imgurl2={award.imgUrl2}
            $imgurl3={award.imgUrl3}
            $imgurl4={award.imgUrl4}
          >
            <SwiperSlide className="one"></SwiperSlide>
            {award.imgUrl2 ? <SwiperSlide className="two"></SwiperSlide> : null}
            {award.imgUrl3 ? <SwiperSlide className="three"></SwiperSlide> : null}
            {award.imgUrl4 ? <SwiperSlide className="four"></SwiperSlide> : null}
          </StyledSwiper>
        </div>


      </div>

      <ul className="rightSide">
        <li>
          <span>우승</span>
          <p className="name">{award.fClass}</p>
          <p className="track">{award.fTrack}</p>
          {award.fLink ? <a href={award.fLink} target="_blank">Live<AiFillYoutube /></a> : null}
          {award.fLink2 ? <a href={award.fLink2} target="_blank">Live<AiFillYoutube /></a> : null}
        </li>
        <li>
          {award.sClass ? (
          <>
          <span>{award.sAward}</span>
          <p className="name">{award.sClass}</p>
          <p className="track">{award.sTrack}</p>
          {award.sLink ? <a href={award.sLink} target="_blank">Live<AiFillYoutube /></a> : null}
          {award.sLink2 ? <a href={award.sLink2} target="_blank">Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
        <li>
          {award.tClass ? (
          <>
          <span>{award.tAward}</span>
          <p className="name">{award.tClass}</p>
          <p className="track">{award.tTrack}</p>
          {award.tLink ? <a href={award.tLink} target="_blank">Live<AiFillYoutube /></a> : null}
          {award.tLink2 ? <a href={award.tLink2} target="_blank">Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
        <li>
          {award.anotherClass ? (
          <>
          <span>{award.anotherAward}</span>
          <p className="name">{award.anotherClass}</p>
          <p className="track">{award.anotherTrack}</p>
          {award.anotherLink ? <a href={award.anotherLink} target="_blank">Live<AiFillYoutube /></a> : null}
          {award.anotherLink2 ? <a href={award.anotherLink2} target="_blank">Live<AiFillYoutube /></a> : null}
          </>
          ) : null}
        </li>
      </ul>
    </HofCardContainer>
  )
}

export default HofCard 