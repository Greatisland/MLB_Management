import { useRef } from "react"
import Swal from "sweetalert2"
import { authFunc } from "../firebase/firebaseFunc"
import { CreateModalContainer } from "../style/loginStyled"

interface Props {
  setIsModal: (value: boolean) => void
}

const JoinModal = ({setIsModal}: Props) => {
  const email = useRef<HTMLInputElement>(null)
  const pw = useRef<HTMLInputElement>(null)
  const pwCheck = useRef<HTMLInputElement>(null)
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    const emailValue = email.current?.value || ''
    const pwValue = pw.current?.value || ''
    const pwCheckValue = pwCheck.current?.value || ''

    // 정규 표현식: 소문자 또는 대문자 알파벳, 숫자만 허용
    const regex = /^[A-Za-z0-9]+$/;
    // 문자열이 정규 표현식과 일치하는지 검사
    if(regex.test(emailValue)){
      Swal.fire({
        icon: 'error',
        title: '올바른 이메일을 작성해주세요.',
         showConfirmButton: false,
        timer: 800
      })
      return
    }

    if(pwValue !== pwCheckValue){
      Swal.fire({
        icon: 'error',
        title: '비밀번호와 비밀번호 확인을 동일하게 해주세요.',
         showConfirmButton: false,
        timer: 800
      })
      return
    }

    if(pwValue.length < 6){
      Swal.fire({
        icon: 'error',
        title: '비밀번호는 6자리 이상으로 해주세요.',
         showConfirmButton: false,
        timer: 800
      })
      return
    }
    authFunc.createAccount(emailValue,pwValue)
  }

  return (
    <CreateModalContainer>
      <h2>회원가입</h2>
      <form onSubmit={handleJoin}>
        <p>이메일 입력</p>
        <input type="text" ref={email} placeholder="ex) abc@naver.com" />
        <p>비밀번호 입력</p>
        <input type="text" ref={pw} placeholder="비밀번호 입력" />
        <p>비밀번호 확인</p>
        <input type="text" ref={pwCheck} placeholder="비밀번호 확인" />
        <input type="submit" value={'가입하기'} />
      </form>
      <div className="exit" onClick={() => setIsModal(false)}>나가기</div>
    </CreateModalContainer>
  )
}

export default JoinModal