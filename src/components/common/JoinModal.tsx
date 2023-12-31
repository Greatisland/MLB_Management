import { useRef } from "react"
import Swal from "sweetalert2"
import { authFunc } from "../../firebase/firebaseFunc.ts"
import { CreateModalContainer } from "../../style/loginStyled.tsx"

interface Props {
  setIsModal: (value: boolean) => void
}


const JoinModal = ({setIsModal}: Props) => {

  const email = useRef<HTMLInputElement>(null)
  const pw = useRef<HTMLInputElement>(null)
  const pwCheck = useRef<HTMLInputElement>(null)
  const displayName = useRef<HTMLInputElement>(null)
  
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    const emailValue = email.current?.value || ''
    const pwValue = pw.current?.value || ''
    const pwCheckValue = pwCheck.current?.value || ''
    const displayNameValue = displayName.current?.value || ''

    // 이메일 검증
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    // 문자열이 정규 표현식과 일치하는지 검사
    if(!emailValue){
      Swal.fire({
        icon: 'error',
        title: '이메일을 작성해주세요.',
         showConfirmButton: false,
        timer: 800
      })
      return
    } else if(!regex.test(emailValue)){
      Swal.fire({
        icon: 'error',
        title: '올바른 이메일을 작성해주세요.',
         showConfirmButton: false,
        timer: 800
      })
      return
    }

    if(!displayNameValue){
      Swal.fire({
        icon: 'error',
        title: '이름을 작성해주세요.',
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
    authFunc.createAccount(emailValue,pwValue,displayNameValue)
    setIsModal(false)
  }

  return (
    <CreateModalContainer>
      <h2>회원가입</h2>
      <p className="notice">해당 어플리케이션은 승인제로 운영됩니다. 운영진이 확인하고 계정을 승인할 수 있도록 이름을 정확하게 입력해주세요.</p>
      <form onSubmit={handleJoin}>
        <p>이름 입력</p>
        <input type="text" ref={displayName} placeholder="정확한 이름을 입력해주세요. ex)김현진" />
        <p>이메일 입력</p>
        <input type="text" ref={email} placeholder="ex) abc@naver.com" />
        <p>비밀번호 입력</p>
        <input type="text" ref={pw} placeholder="비밀번호는 6자리 이상으로 작성해주세요." />
        <p>비밀번호 확인</p>
        <input type="text" ref={pwCheck} placeholder="비밀번호 확인" />
        <input type="submit" value={'가입하기'} />
      </form>
      <div className="exit" onClick={() => setIsModal(false)}>나가기</div>
    </CreateModalContainer>
  )
}

export default JoinModal