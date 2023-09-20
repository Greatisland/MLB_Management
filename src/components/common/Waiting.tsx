import { HomeContainer } from "../../style/homeStyled.tsx"
import Header from "./Header.tsx"
const Waiting = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <div className="wait">
          잠시만 기다려주세요... <br />
          실제 뮤라밸 회원인지 운영진이 확인하고 승인하기 전에는 사용할 수 없어요... <br />
          가입하고나서 운영진 아무에게나 가입했다고 꼭 말씀해주세요~!<br />
          승인될 경우 별다른 과정이나 알림 없이 즉시 사용이 가능해요.
          <img src="https://firebasestorage.googleapis.com/v0/b/mlb-management.appspot.com/o/MyPhoto_1082838927_1190.jpg?alt=media&token=74d20823-2119-45ee-a431-5d36b08be889" />
        </div>
      </HomeContainer>
    </>

  )
}

export default Waiting