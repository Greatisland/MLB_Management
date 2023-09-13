import { Btn, BtnListContainer } from "../../style/globalStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleModal, sendMember } from "../../store/slice.ts"
import { BiMale, BiFemale, BiMaleFemale } from 'react-icons/bi'

const BtnList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const totalMembers = membersData.filter(member => !member[1].break && member[1].join)
  const totalGender = (param: string) => {return totalMembers.reduce((acc: number, member) => {
    let gender = member[1].gender
    if(gender === param) {return acc + 1}
      else {return acc}
    }, 0)
  }

  const handleAddMember = () => {
    //레벨 2 이상부터 운영진
    if(loginUser.level >= 2){
      dispatch(toggleModal()), dispatch(sendMember({
        id: '', 
        name: '',
        join: '',
        year: '',
        etc: '',
        state: false
      }))
    }
  }

  return (
    <BtnListContainer>
      <Btn className='totalReview'>
        <span className="total">총원<BiMaleFemale/></span>
        <span className="number">{totalMembers.length}</span>
        <span className="male">남<BiMale /></span>
        <span className="number">{totalGender('남')}</span>
        <span className="female">여<BiFemale /></span>
        <span className="number">{totalGender('여')}</span>
      </Btn>
      {loginUser.level >= 2 ? 
      <Btn className="memberAdd" onClick={() => handleAddMember()}>
        <p>회원추가</p>
      </Btn> : null}
    </BtnListContainer>
  )
}

export default BtnList