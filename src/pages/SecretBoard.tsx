import Footer from "../components/Footer"
import SecretBoardList from "../components/SecretBoardList"
import { SecretBoardContainer } from "../style/secretBoardStyled"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc"

const SecretBoard = () => {
  const [ board, setBoard ] = useState([])

  useEffect(() => {
    dbFunc.getBoard((value) => {
      setBoard(value)
    })
  }, [])
  
  return (
    <SecretBoardContainer>
      <SecretBoardList board={board}/>
      <Footer />
    </SecretBoardContainer>
  )
}

export default SecretBoard