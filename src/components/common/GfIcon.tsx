import { Link } from "react-router-dom";
import { GfIconBtn, GfIconBtnContainer } from "../../style/globalStyled";

const GfIcon = () => {
  return (
    <GfIconBtnContainer>
    <Link to='/GrandFather'>
     <GfIconBtn />
     {/* <p>뮤라밸 할아버지</p> */}
    </Link>
    </GfIconBtnContainer>

  )
}

export default GfIcon;