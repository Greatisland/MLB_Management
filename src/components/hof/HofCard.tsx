import { HofCardContainer, SwiperContainer, StyledSwiperSlide } from "../../style/hallOfFameStyled.tsx"
import { AiFillYoutube } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import type { Hof } from "../../store/slice.ts"
import { Swiper } from "swiper/react";
import { Navigation } from 'swiper/modules';
import { useAppDispatch } from "../../store/hook.ts";
import { stopSwiping, startSwiping } from "../../store/slice.ts";
import 'swiper/css';


interface Props {
  onClick: () => void
  award: Hof
}
const HofCard = ({award, onClick} : Props) => {
  const dispatch = useAppDispatch()

  return (
    <HofCardContainer>
      <div className="leftSide">
        <div className="textSide" onClick={onClick}>
          <h3>{award.eventName}</h3>
          <p>{(award.eventDate).replace(/-/g, '.')}</p>
        </div>
        <SwiperContainer>
          <Swiper
            modules={[Navigation]} 
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.right',
              prevEl: '.left'
            }}
            loop={true}
            onTouchStart={() => dispatch(stopSwiping())}
            onTouchEnd={() => dispatch(startSwiping())}
          >
            {award.imgUrl2 ? <>
              <IoIosArrowBack className="left" />
              <IoIosArrowForward className="right" /> 
            </> : null}
            <StyledSwiperSlide ImgUrl={award.imgUrl} />
            {award.imgUrl2 ? <StyledSwiperSlide ImgUrl={award.imgUrl2} /> : null}
            {award.imgUrl3 ? <StyledSwiperSlide ImgUrl={award.imgUrl3} /> : null}
            {award.imgUrl4 ? <StyledSwiperSlide ImgUrl={award.imgUrl4} /> : null}
          </Swiper>
        </SwiperContainer>
      </div>

      <ul className="rightSide">
        {['f', 's', 't', 'another'].map((keyword, i) => (
          <li key={i}>
            {award[`${keyword}Class`] ? (
              <>
              <span>{award[`${keyword}Award`]}</span>
              <p className="name">{award[`${keyword}Class`]}</p>
              <p className="track">{award[`${keyword}Track`]}</p>
              {award[`${keyword}Link`] ? <a href={award[`${keyword}Link`]} target="_blank">Live<AiFillYoutube /></a> : null}
              {award[`${keyword}Link2`] ? <a href={award[`${keyword}Link2`]} target="_blank">Live<AiFillYoutube /></a> : null}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </HofCardContainer>
  )
}

export default HofCard 