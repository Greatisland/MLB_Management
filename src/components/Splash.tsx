import { SplashContainer } from "../style/globalStyled"
import { LoginContainer } from "../style/loginStyled"

const Splash = () => {
  return (
    <SplashContainer>
      <LoginContainer>
        <h1 className="eng">MLB<br />Management</h1>
      </LoginContainer>
    </SplashContainer>
  )
}

export default Splash