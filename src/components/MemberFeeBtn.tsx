import { Btn, BtnListContainer } from "../style/globalStyled"
import { payAllToggle } from "../store/slice"
import { useAppDispatch } from "../store/hook"
import Swal from "sweetalert2"

const MemberFeeBtn = () => {
  const dispatch = useAppDispatch()

  const allDone = () => {
    Swal.fire({
      title: `모든 회원의 회비가 납부처리됩니다.`,
      text: "속도가 느리니 확인 후 조금만 기다려주세요.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '확인.',
      cancelButtonText: '취소.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '완료',
          html: `
          모든 회원의 회비가 납부완료 되었습니다!
          `,
          showConfirmButton: false,
          timer: 1000
        })
        dispatch(payAllToggle(true))
        return
      }else{return}
    })
  }

  const allNone = () => {
    Swal.fire({
      title: `모든 회원의 회비가 미납처리됩니다.`,
      text: "속도가 느리니 확인 후 조금만 기다려주세요.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '확인.',
      cancelButtonText: '취소.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '완료',
          html: `
          모든 회원의 회비가 초기화 되었습니다!
          `,
          showConfirmButton: false,
          timer: 1000
        })
        dispatch(payAllToggle(false))
        return
      }else{return}
    })
  }

  return (
    <BtnListContainer>
      <Btn onClick={() => {allDone()}}>
        <p>모두 납부완료</p>
      </Btn>
      <Btn onClick={() => {allNone()}}>
        <p>모두 미납처리</p>
      </Btn>
    </BtnListContainer>
  )
}

export default MemberFeeBtn