import { SplashContainer } from "../../style/globalStyled.tsx"
import { SplashCom } from "../../style/loginStyled.tsx"
import { LinearProgress } from "@mui/material"


const Splash = () => {
  return (
    <SplashContainer>
      <SplashCom>
        <h1 className="eng">MLB<br />Management</h1>
        <LinearProgress />
      </SplashCom>
    </SplashContainer>
  )
}

export default Splash