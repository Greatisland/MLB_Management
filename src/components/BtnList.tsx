import { Btn, BtnListContainer } from "../style/globalStyled"
import { useAppDispatch } from "../store/hook"
import { toggleModal, sendMember } from "../store/slice"

const BtnList = () => {
  const dispatch = useAppDispatch()

  return (
    <BtnListContainer>
      <Btn onClick={()=>{dispatch(toggleModal()), dispatch(sendMember({
        id: '', 
        archived: '',
        name: '',
        join: '',
        year: '',
        etc: '',
        state: false
      }))}}>
        <p>회원추가</p>
      </Btn>
      <Btn onClick={() => {}}>
        <p>검색</p>
      </Btn>
    </BtnListContainer>
  )
}

export default BtnList