import { FooterContainer } from "../style/footerStyled"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <FooterContainer>
      <Link to='/'>회원관리</Link>
      <Link to='/partpage'>참석관리</Link>
      <Link to='/memberfee'>회비관리</Link>
    </FooterContainer>
  )
}

export default Footer