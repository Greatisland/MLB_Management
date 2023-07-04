import { HofListContainer } from "../style/hallOfFameStyled"
import HofCard from "./HofCard"
import { useAppSelector } from "../store/hook"

const HofList = () => {
  const { hofData } = useAppSelector(state => state.membersData)
  const sortHofData = [...hofData].sort((a, b) => {
    return (new Date(b[1].eventDate).getTime() - new Date(a[1].eventDate).getTime())
  })

  return (
    <HofListContainer>
      {sortHofData.map((award, i) => (
        <HofCard key={i} award={award[1]}/>
      ))}
    </HofListContainer>
  )
}

export default HofList