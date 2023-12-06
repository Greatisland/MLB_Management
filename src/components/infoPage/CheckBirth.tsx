import { useAppSelector } from "../../store/hook.ts"
import { useState, useEffect } from "react"
import { CheckBirthContainer, BirthAlert } from "../../style/homeStyled.tsx"
import { FaBirthdayCake } from "react-icons/fa";
import { dbFunc } from "../../firebase/firebaseFunc.ts";
import Swal from "sweetalert2"

const CheckBirth = () => {
  const { loginUser, membersData } = useAppSelector(state => state.membersData)
  const [ member, setMember ] = useState<any[]>([])
  const [ isModal, setIsModal ] = useState(false)

  const [isMonth, setIsMonth] = useState('1')
  const [isDay, setIsDay] = useState('1')

  useEffect(() => {
    const name = loginUser.name
    const loginMemberData = membersData.filter((member) => member[1]?.name === name)
    if(loginMemberData.length > 0 && !loginMemberData[0][1].birth){
      setMember(loginMemberData[0])
    }
  }, [member])

  const month = new Array(12).fill('').map((_, i) => i+1)
  const day = new Array(31).fill('').map((_, i) => i+1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire({
      title: `생일 정보를 업데이트합니다.`,
      text: `${loginUser.name}님의 생일이 ${isMonth}월 ${isDay}일이 맞나요?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '맞아요.',
      cancelButtonText: '아니요.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '완료',
          html: `
          생일이 업데이트되었습니다!
          `,
          showConfirmButton: false,
          timer: 1000
        })
        // 수락 후 작업
        if (member) {
          const updatedMember = [member[0], {
            ...member[1], birth: `${isMonth}월 ${isDay}일`
          }]
          
          setMember(updatedMember)
          dbFunc.updateMember(updatedMember[0], updatedMember[1])
        }
        setIsModal(false)
        
        // 리렌더링
        setMember([])
        return
      }else{return}
    })
  };

  if(member.length > 0){
    return (
      <>
      <CheckBirthContainer onClick={() => setIsModal(!isModal)}>
        <FaBirthdayCake />
        혹시 생일정보를 입력하셨나요? <br />
        여기를 눌러 생일을 알려주세요.
        <FaBirthdayCake />
      </CheckBirthContainer>

      {isModal && 
      <BirthAlert>
        <form onSubmit={handleSubmit}>
          <p>생일을 알려주세요!</p>
          <select onChange={e => setIsMonth(e.target.value)}>
            {month.map((value, i) => (
              <option value={value} key={i}>{value}</option>
            ))}
          </select>
          <span>월</span>
          <select onChange={e => setIsDay(e.target.value)}>
            {day.map((value, i) => (
              <option value={value} key={i}>{value}</option>
            ))}
          </select>
          <span>일</span>
          <div className="button">
            <input type="submit" value="완료"></input>
            <div className="cancle" onClick={() => setIsModal(!isModal)}>취소</div>
          </div>
        </form>
      </BirthAlert>}
      </>
    )
  }else{
    return null
  }

}

export default CheckBirth