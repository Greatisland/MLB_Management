import { Btn, BtnListContainer } from "../style/globalStyled"
import { payAllToggle } from "../store/slice"
import { useAppDispatch } from "../store/hook"

const MemberFeeBtn = () => {
  const dispatch = useAppDispatch()

  return (
    <BtnListContainer>
      <Btn onClick={() => {dispatch(payAllToggle(true))}}>
        <p>모두 납부완료</p>
      </Btn>
      <Btn onClick={() => {dispatch(payAllToggle(false))}}>
        <p>모두 미납처리</p>
      </Btn>
    </BtnListContainer>
  )
}

export default MemberFeeBtn