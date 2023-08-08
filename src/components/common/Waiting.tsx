import { HomeContainer } from "../../style/homeStyled.tsx"
const Waiting = () => {
  return (
    <HomeContainer>
      <div className="wait">
        뮤라밸 운영진이 아직 확인 전이에요... <br />
        잠시만 기다려주세요... <br />
        바빠서 미처 확인 못할 수 있으니 운영진에게 가입했다고 말씀해주시면 좋아요~!
        <img src="https://firebasestorage.googleapis.com/v0/b/mlb-management.appspot.com/o/MyPhoto_1082838927_1190.jpg?alt=media&token=74d20823-2119-45ee-a431-5d36b08be889" />
      </div>
    </HomeContainer>
  )
}

export default Waiting