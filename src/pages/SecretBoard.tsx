import Footer from "../components/Footer"
import SecretBoardList from "../components/SecretBoardList"
import { SecretBoardContainer } from "../style/secretBoardStyled"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc"

const SecretBoard = () => {
  const [ board, setBoard ] = useState([])

  useEffect(() => {
    dbFunc.getBoard((value: any) => {
      setBoard(value.reverse())
    })
  }, [])
  
  return (
    <SecretBoardContainer>
      <p className="notice">익명게시판은 무조건 익명으로 글이 작성되며 누가 썼는지 확인할 수 없습니다. 자유롭게 아무말이나 써주세요!
      </p>
      <SecretBoardList board={board}/>
      <Footer />
    </SecretBoardContainer>
  )
}

export default SecretBoard