import { FooterContainer } from "../../style/footerStyled.tsx"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hook.ts"
import { AiOutlineUser, AiFillEdit, AiFillDatabase, AiFillTrophy } from 'react-icons/ai'; 
import { GiMoneyStack } from 'react-icons/gi'; 
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const location = useLocation()
  return (
    <>
    {loginUser.state ? 
      <FooterContainer>
        <Link to='/infopage' className={location.pathname === '/infopage' ? 'spot' : 'none'}><AiOutlineUser /><p>회원관리</p></Link>
        <Link to='/partpage' className={location.pathname === '/partpage' ? 'spot' : 'none'}><AiFillEdit /><p>참석관리</p></Link>
        {loginUser.level >= 2 ? <Link to='/memberfee' className={location.pathname === '/memberfee' ? 'spot' : 'none'}><GiMoneyStack /><p>회비관리</p></Link> : null}
        <Link to='/secretboard' className={location.pathname === '/secretboard' ? 'spot' : 'none'}><AiFillDatabase /><p>칭찬게시판</p></Link>
        <Link to='/halloffame' className={location.pathname === '/halloffame' ? 'spot' : 'none'}><AiFillTrophy /><p>명예의 전당</p></Link>
      </FooterContainer> :
      <></>
    }
    </>
  )
}

export default Footer