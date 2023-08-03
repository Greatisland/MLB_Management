import { CheckboxContainer, HiddenCheckbox, JoinModalContainer, NormalModalContainer, JoinModalWrapper, StyledCheckbox } from "../../style/headerStyle"
import { useState, ChangeEvent, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hook"
import { toggleModal } from "../../store/slice"
import Swal from "sweetalert2"
import { StyledGiTrophy } from "../../style/homeStyled"
import { dbFunc } from "../../firebase/firebaseFunc"


const MemberModal = () => {
  
  const dispatch = useAppDispatch()
  const { loginUser, sendMember } = useAppSelector(state => state.membersData)
  const [state, setState] = useState({
    name: sendMember.name || '',
    join: sendMember.join || '',
    comeback: sendMember.comeback || '',
    year: sendMember.year || '',
    etc: sendMember.etc || '',
    gender: sendMember.gender || '',
    pay: false,
    special: sendMember.special || '',
    target: '',
    break: sendMember.break || false,
    state: sendMember.state || false
  })

  //휴식기 체크박스 해제할 경우 오늘 날짜로 복귀일 추가
  useEffect(() => {
    if(state.state && sendMember.break !== state.break && !state.break){
      const currentDate: Date = new Date()
      const year: number = currentDate.getFullYear()
      let month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0')
      let date: string = currentDate.getDate().toString().padStart(2, '0')
      const formattedDate: string = `${year}-${month}-${date}`
      setState({...state, comeback: formattedDate})
    }
  }, [state.break])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //기존 회원정보 수정
    if(
      sendMember.state &&
      (
      sendMember.name !== state.name ||
      sendMember.join !== state.join ||
      sendMember.year !== state.year ||
      sendMember.etc !== state.etc ||
      sendMember.gender !== state.gender ||
      sendMember.special !== state.special ||
      sendMember.break !== state.break ||
      sendMember.comeback !== state.comeback
      )
      ){
        //수정할 때 정보를 모두 채운 경우
        if(
          state.name !== '' &&
          state.join !== '' &&
          state.year !== '' &&
          state.gender !== ''
        ){
          dbFunc.updateMember(sendMember.id as string, state)
          dispatch(toggleModal())
        }else{
          Swal.fire({
            html: `
              회원 정보를 모두 채워주세요!
            `,
            icon: 'warning',
            showCancelButton: false,
            confirmButtonText: "알겠습니다 ㅠㅠ",
          })
        }
      }else if(sendMember.state){
        Swal.fire({
          html: `
            아무것도 변경되지 않았어요!
          `,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: "넵..",
        })
      }else if(

      //신규회원 추가
      !sendMember.state &&
      state.name !== '' &&
      state.join !== '' &&
      state.year !== '' &&
      state.gender !== ''
      ){
      dbFunc.addMember(state)
      Swal.fire({
        icon: 'success',
        title: `${state.name}님이 회원으로 추가되었어요!`,
        showConfirmButton: false,
        timer: 800
      })
      dispatch(toggleModal())
    }else if(!sendMember.state) {
      Swal.fire({
        html: `
          회원 정보를 모두 채워주세요!
        `,
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: "알겠습니다 ㅠㅠ",
      })
    }
  }

  const deleteMenber = (id: string) => {
    if(id !== ''){
      Swal.fire({
        title: `정말로 ${state.name}님을 회원정보에서 지우시겠어요?`,
        text: "탈퇴한 회원일 경우 지워주세요!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e99797',
        cancelButtonColor: '#4ec6e4',
        confirmButtonText: '지우겠습니다.',
        cancelButtonText: '지우지 않겠습니다.'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: '삭제완료',
            html: `
            ${state.name}님이 회원목록에서 사라졌어요!
            `,
            showConfirmButton: false,
            timer: 1000
          })
          dbFunc.removeMember(id)
          dispatch(toggleModal())
          return
        }else{return}
      })
    }
  }

  const cancleMember = () => {
    dispatch(toggleModal())
  }

  const dummyArray = new Array(15).fill('년생')

  return (
    <JoinModalWrapper>
      {loginUser.level >= 2 ?
      <JoinModalContainer>
        <form onSubmit={handleSubmit}>
          <p>이름</p>
          <input type="text" value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder="이름을 입력하세요."></input>
          <p>가입일</p>
          <input type="date" value={state.join} onChange={e => setState({...state, join: e.target.value})} placeholder="날짜를 선택해주세요."></input>
          <p>년생</p>
          <select value={state.year} onChange={e => setState({...state, year: e.target.value})}>
            <option value=''>선택</option>
            {dummyArray.map((v, i) => (
              <option key={i} value={i + 1988}>{i + 1988 + v}</option>
            ))}
          </select>
          <p>성별</p>
          <select value={state.gender} onChange={e => setState({...state, gender: e.target.value})}>
            <option value={''}>선택</option>
            <option value={'남'}>남</option>
            <option value={'여'}>여</option>
          </select>
          <p>메모</p>
          <input type="text" value={state.etc} onChange={e => setState({...state, etc: e.target.value})} placeholder="자유롭게 메모하세요."></input>
          <p>운영진 여부</p>
          <select value={state.special} onChange={e => {
            const specialData = e.target.value || ''
            setState({...state, special: specialData})
          }}>
            <option value="">일반회원</option>
            <option value="모임장">모임장</option>
            <option value="운영진">운영진</option>
          </select>
          {sendMember.awardCount ? <>
            <p>가요제 수상횟수</p>
            <span className="awardCount">{
              new Array(sendMember.awardCount).map((trophy, i) => (
                <StyledGiTrophy bgColor='#f00' />
              ))
            }</span>
          </> : null}
          {sendMember.comeback ? 
          <>
          <p>복귀일</p>
          <input type="date" value={state.comeback} onChange={e => setState({...state, comeback: e.target.value})} placeholder="날짜를 선택해주세요."></input>
          </> : null}
          <div className="checkFlex">
          <p>휴식기 여부</p>
          <CheckboxContainer>
            <HiddenCheckbox checked={state.break} onChange={(e: ChangeEvent<HTMLInputElement>) => setState({...state, break: e.target.checked})}/>
            <StyledCheckbox />
          </CheckboxContainer>
          </div>
          <input type="submit" value="완료"></input>
        </form>
        <div className='btnWrapper'>
          <div className="cancle" onClick={() => {cancleMember()}}>취소</div>
          {sendMember.state ? <div className="delete" onClick={() => {deleteMenber(sendMember.id as string)}}>회원정보 삭제</div> : null}
        </div>
      </JoinModalContainer> :
      <NormalModalContainer>
          <p>이름</p>
          <span>{state.name}</span>
          <p>가입일</p>
          <span>{state.join.split('-').join('.')}</span>
          <p>년생</p>
          <span>{state.year}년생</span>
          <p>성별</p>
          <span>{state.gender}</span>
          {sendMember.awardCount ? <>
            <p>가요제 수상횟수</p>
            <span className="awardCount">{
              new Array(sendMember.awardCount).fill('').map((trophy, i) => (
                <StyledGiTrophy bgColor='#c5a26e' />
              ))
            }</span>
          </> : null}
          {sendMember.comeback ? 
          <>
          <p>복귀일</p>
          <span>{state.comeback.split('-').join('.')}</span>
          </> : null}
          <div className="cancle" onClick={() => {cancleMember()}}>나가기</div>
      </NormalModalContainer>}
    </JoinModalWrapper>
  )
}

export default MemberModal