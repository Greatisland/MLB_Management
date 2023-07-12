import { SplashContainer } from "../../style/globalStyled"
import { LoginContainer } from "../../style/loginStyled"
import LinearProgress from '@mui/material/LinearProgress'; 

const Splash = () => {
  return (
    <SplashContainer>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>
        <LinearProgress color="secondary" />
      </LoginContainer>
    </SplashContainer>
  )
}

export default Splash