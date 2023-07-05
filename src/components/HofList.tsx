import { HofListContainer } from "../style/hallOfFameStyled"
import HofCard from "./HofCard"
import { useAppSelector } from "../store/hook"
import HofAddModal from "./HofAddModal"
import { useState } from "react"
import type { Hof } from "../store/slice"

const HofList = () => {
  const { hofData } = useAppSelector(state => state.membersData)
  const sortHofData = [...hofData].sort((a, b) => {
    return (new Date(b[1].eventDate).getTime() - new Date(a[1].eventDate).getTime())
  })
  const [ isModal, setIsModal ] = useState(false)

  const handleModal = (award: [string, Hof]) => {
    console.log('open')
  }

  return (
    <HofListContainer>
      {sortHofData.map((award, i) => (
        <HofCard key={i} award={award[1]} onClick={() => handleModal(award)}/>
      ))}
      {isModal ? <HofAddModal /> : null}
    </HofListContainer>
  )
}

export default HofList