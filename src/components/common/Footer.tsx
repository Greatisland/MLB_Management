import { FooterContainer } from "../../style/footerStyled.tsx"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hook.ts"
import { AiOutlineUser, AiFillEdit, AiFillDatabase, AiFillTrophy } from 'react-icons/ai'; 
import { GiMoneyStack } from 'react-icons/gi'; 
import { BsFillBarChartFill } from 'react-icons/bs'; 
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const location = useLocation()
  const currentPath = location.pathname // 현재 위치한 페이지 확인하여 Footer css에 효과 주기 위함
  return (
    <>
    {loginUser.state ? 
      <FooterContainer isLevelTwoOrAbove={loginUser.level >= 2}>
        <Link to='/infopage' className={currentPath === '/' || currentPath === '/infopage' ? 'spot' : 'none'}><AiOutlineUser /><p>회원관리</p></Link>
        <Link to='/partpage' className={currentPath === '/partpage' ? 'spot' : 'none'}><AiFillEdit /><p>참석관리</p></Link>
        <Link to='/graphpage' className={currentPath === '/graphpage' ? 'spot' : 'none'}><BsFillBarChartFill /><p>통계</p></Link>
        {loginUser.level >= 2 ? <Link to='/memberfee' className={currentPath === '/memberfee' ? 'spot' : 'none'}><GiMoneyStack /><p>회비관리</p></Link> : null}
        <Link to='/secretboard' className={currentPath === '/secretboard' ? 'spot' : 'none'}><AiFillDatabase /><p>익명게시판</p></Link>
        <Link to='/halloffame' className={currentPath === '/halloffame' ? 'spot' : 'none'}><AiFillTrophy /><p>명예의 전당</p></Link>
      </FooterContainer> :
      <></>
    }
    </>
  )
}

export default Footer