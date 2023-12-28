import { HomeContainer } from "../../style/homeStyled.tsx"
import { useAppSelector } from "../../store/hook.ts"
import { useState } from "react"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import Header from "./Header.tsx"

const Waiting = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const [userName, setUserName] = useState(loginUser.name)

  const handleNameChange = (e: React.FormEvent) => {
    e.preventDefault()
    dbFunc.updateAccount(loginUser.uid, {name: userName})
  }
  return (
    <>
      <Header />
      <HomeContainer>

        <div className="wait">
        <form onSubmit={handleNameChange}>
          <p>성함이 {loginUser.name}님이 맞나요? 아니라면 운영진이 확인하고 계정을 승인할 수 있도록 정확한 이름으로 수정해주세요. 누구인지 확인이 어려울 경우 계정승인이 거부될 수 있습니다.</p>

          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          <input type="submit" value='변경' />
        </form>
          <p className="notice">

          운영진이 승인할 때 까지 잠시만 기다려주세요... <br />
          가입하고나서 운영진 아무에게나 가입했으니 확인해달라고 말씀해주세요!<br />
          </p>
          <img src="https://firebasestorage.googleapis.com/v0/b/mlb-management.appspot.com/o/MyPhoto_1082838927_1190.jpg?alt=media&token=74d20823-2119-45ee-a431-5d36b08be889" />
        </div>
      </HomeContainer>
    </>

  )
}

export default Waiting