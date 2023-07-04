import { FooterContainer } from "../style/footerStyled"
import { Link } from "react-router-dom"
import { useAppSelector } from "../store/hook"

const Footer = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <>
    {loginUser.state ? 
      <FooterContainer>
        <Link to='/infopage'>회원관리</Link>
        <Link to='/partpage'>참석관리</Link>
        <Link to='/memberfee'>회비관리</Link>
        <Link to='/halloffame'>명예의 전당</Link>
      </FooterContainer> :
      <></>
    }
    </>
  )
}

export default Footer