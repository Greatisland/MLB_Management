import { FooterContainer } from "../style/footerStyled"
import { Link } from "react-router-dom"
import { useAppSelector } from "../store/hook"
import { AiOutlineUser, AiFillEdit, AiFillDatabase, AiFillTrophy } from 'react-icons/ai'; 
import { GiMoneyStack } from 'react-icons/gi'; 

const Footer = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  return (
    <>
    {loginUser.state ? 
      <FooterContainer>
        <Link to='/infopage'><AiOutlineUser /><p>회원관리</p></Link>
        <Link to='/partpage'><AiFillEdit /><p>참석관리</p></Link>
        <Link to='/memberfee'><GiMoneyStack /><p>회비관리</p></Link>
        <Link to='/secretboard'><AiFillDatabase /><p>칭찬게시판</p></Link>
        <Link to='/halloffame'><AiFillTrophy /><p>명예의 전당</p></Link>
      </FooterContainer> :
      <></>
    }
    </>
  )
}

export default Footer