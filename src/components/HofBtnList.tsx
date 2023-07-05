import { Btn, BtnListContainer } from "../style/globalStyled"
import { useState } from "react"
import HofAddModal from "./HofAddModal"
import { useAppSelector } from "../store/hook"
import Swal from "sweetalert2"
import { GiTrophy } from 'react-icons/gi';

const HofBtnList = () => {

  const { loginUser } = useAppSelector(state => state.membersData)
  const [ isModal, setIsModal ] = useState(false)

  const handleModal = () => {
    if(loginUser.level >= 2){
      setIsModal(true)
    }else{
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }
  return (
    <BtnListContainer>
      <p className="hofTitle eng"><GiTrophy />Hall Of Fame<GiTrophy/></p>
      {loginUser.level >= 2 ? 
      <Btn className="memberAdd" onClick={handleModal}>
        <p>수상기록 추가</p>
      </Btn> : null
      }     
      {isModal ? <HofAddModal setIsModal={setIsModal}/> : null}
    </BtnListContainer>
  )
}

export default HofBtnList