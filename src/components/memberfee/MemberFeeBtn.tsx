import { Btn, BtnListContainer } from "../../style/globalStyled.tsx"
import { useAppSelector } from "../../store/hook.ts"
import Swal from "sweetalert2"
import { dbFunc } from "../../firebase/firebaseFunc.ts"

const MemberFeeBtn = () => {
  const { membersData, loginUser, fee } = useAppSelector(state => state.membersData)

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

const handleFee = () => {
  if(loginUser.level >= 3) {
  Swal.fire({
    title: `회비 금액을 수정해주세요. 현재 회비는 ${fee.gold.toLocaleString()}원 입니다.`,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: '변경',
    cancelButtonText: '취소',
    showLoaderOnConfirm: true,
    preConfirm: (gold) => {
      if(!isNaN(gold)){ // 입력값이 숫자일 경우
        return dbFunc.updateFee(Number(gold))
      } else {
        Swal.showValidationMessage(`숫자만 입력해주세요.`) // 숫자가 아닐 경우 에러 메시지 표시
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('완료!', '회비가 변경되었어요.', 'success')
      }
  })}else{
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
      <Btn className="fee" onClick={() => {handleFee()}}>
        <p>회비금액 <br />조정</p>
      </Btn>
      <Btn className="fee" onClick={() => {allDone()}}>
        <p>모두 <br />납부완료</p>
      </Btn>
      <Btn className="fee" onClick={() => {allNone()}}>
        <p>모두 <br />미납처리</p>
      </Btn>
    </BtnListContainer>
  )
}

export default MemberFeeBtn