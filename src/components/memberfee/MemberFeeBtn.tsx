import { Btn, BtnListContainer } from "../../style/globalStyled"
import { useAppSelector } from "../../store/hook"
import Swal from "sweetalert2"
import { dbFunc } from "../../firebase/firebaseFunc"

const MemberFeeBtn = () => {
  const { membersData, loginUser } = useAppSelector(state => state.membersData)

  const allDone = () => {
    if(loginUser.level >= 3) {
    Swal.fire({
      title: `모든 회원의 회비가 납부처리됩니다.`,
      text: "이번 달 회비가 모두 납부되었나요?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '네.',
      cancelButtonText: '취소할게요.'
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
        membersData.forEach(member => {
          dbFunc.updateMember(member[0], {pay: true})
        })
        return
      }else{return}
    })} else {
      Swal.fire({
        icon: 'warning',
        title: '총무 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  const allNone = () => {
    if(loginUser.level >= 3) {
    Swal.fire({
      title: `모든 회원의 회비가 미납처리됩니다.`,
      text: "다음 달 회비관리를 위해 초기화해야 할 경우 이 기능을 사용해주세요.",
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
        membersData.forEach(member => {
          dbFunc.updateMember(member[0], {pay: false})
        })
        return
      }else{return}
    })} else {
      Swal.fire({
        icon: 'warning',
        title: '총무 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
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