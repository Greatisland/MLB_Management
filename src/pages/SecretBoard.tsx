import Footer from "../components/common/Footer.tsx"
import SecretBoardList from "../components/secretboard/SecretBoardList.tsx"
import { SecretBoardContainer } from "../style/secretBoardStyled.tsx"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc.ts"
import { useAppSelector } from "../store/hook.ts"
import Waiting from "../components/common/Waiting.tsx"
import GfIcon from "../components/common/GfIcon.tsx"


const SecretBoard = () => {
  const [ board, setBoard ] = useState([])
  const { loginUser } = useAppSelector(state => state.membersData)

  useEffect(() => {
    dbFunc.getBoard((value: any) => {
      setBoard(value.reverse())
    })
  }, [])
  
  return (
    <>{loginUser.level >= 1 ?
      <SecretBoardContainer>
      <p className="notice">익명게시판은 글을 누가 썼는지 확인할 수 없습니다. 자유롭게 아무말이나 써주세요!
      </p>
      <SecretBoardList board={board}/>
      <Footer />
      <GfIcon />
    </SecretBoardContainer> :
    <Waiting />}
    </>
  )
}

export default SecretBoard