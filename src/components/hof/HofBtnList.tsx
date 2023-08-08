import { Btn, BtnListContainer } from "../../style/globalStyled.tsx"
import { useState, useEffect } from "react"
import HofAddModal from "./HofAddModal.tsx"
import { useAppSelector } from "../../store/hook.ts"
import Swal from "sweetalert2"
import { GiTrophy } from 'react-icons/gi';

const HofBtnList = () => {

  const { loginUser } = useAppSelector(state => state.membersData)
  const [ isModal, setIsModal ] = useState(false)
  const [scrollPos, setScrollPos] = useState(0)

  const handleModal = () => {
    if(loginUser.level >= 2){
      setScrollPos(window.scrollY)
      setIsModal(true)
      document.body.classList.add('no-scroll')
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
    <>
      {loginUser.level >= 2 ? 
      <Btn className="memberAdd" onClick={handleModal}>
        <p>수상기록 추가</p>
      </Btn> : null
      }    
    <BtnListContainer>

      <p className="hofTitle eng"><GiTrophy />Hall Of Fame<GiTrophy/></p>
 
      {isModal ? <HofAddModal setIsModal={setIsModal} /> : null}
    </BtnListContainer>
    </>
  )
}

export default HofBtnList