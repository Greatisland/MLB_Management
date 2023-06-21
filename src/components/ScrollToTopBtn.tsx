import { BiArrowFromBottom } from 'react-icons/bi';
import { ScrollToTopBtnContainer } from '../style/globalStyled';

const ScrollToTopBtn = () => {
  const scrollTop = () => {
    window.scrollTo(0, 0)
  }

  return (
    <ScrollToTopBtnContainer onClick={scrollTop}>
      <BiArrowFromBottom />
    </ScrollToTopBtnContainer>
  )
}

export default ScrollToTopBtn