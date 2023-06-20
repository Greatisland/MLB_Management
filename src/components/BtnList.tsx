import { Btn, BtnListContainer } from "../style/globalStyled"
import { useAppDispatch } from "../store/hook"
import { sortState } from "../store/slice"

const BtnList = () => {
  const dispatch = useAppDispatch()
  const selectSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortState(e))
  }

  return (
    <BtnListContainer>
      <Btn>
        <select onChange={selectSort}>
          <option value='join'>가입일</option>
          <option value='name'>이름</option>
          <option value='birth'>년생</option>
        </select>
      </Btn>
      <Btn onClick={() => {}}>
        <p>회원추가</p>
      </Btn>
      <Btn onClick={() => {}}>
        <p>회원삭제</p>
      </Btn>
    </BtnListContainer>
  )
}

export default BtnList