import { BiArrowFromBottom } from 'react-icons/bi';
import { ScrollToTopBtnContainer } from '../../style/globalStyled.tsx';
import { useState, useEffect } from 'react';

const ScrollToTopBtn = () => {
  const [visible, setVisible] = useState(false)  // visibility state

  const checkScroll = () => {
    if (window.scrollY > 300) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const scrollTop = () => {
    window.scrollTo(0, 0)
  }

  if (!visible) return null
  return (
    <ScrollToTopBtnContainer onClick={scrollTop}>
      <BiArrowFromBottom />
    </ScrollToTopBtnContainer>
  )
}

export default ScrollToTopBtn