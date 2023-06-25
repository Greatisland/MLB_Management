import { JoinModalContainer, JoinModalWrapper } from "../style/headerStyle"
import { NotionApi } from "../api/NotionApi"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, memberUpdate, memberDelete } from "../store/slice"
import Swal from "sweetalert2"


const MemberModal = () => {
  
  const dispatch = useAppDispatch()
  const { sendMember } = useAppSelector(state => state.membersData)
  const [state, setState] = useState({
    name: sendMember.name || '',
    join: sendMember.join || '',
    year: sendMember.year || '',
    etc: sendMember.etc || '',
    gender: sendMember.gender || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //기존 회원정보 수정
    if(
      state.name !== '' &&
      state.join !== '' &&
      state.year !== '' &&
      state.gender !== '' &&
      sendMember.state &&
      (sendMember.name !== state.name ||
        sendMember.join !== state.join ||
        sendMember.year !== state.year ||
        sendMember.etc !== state.etc ||
        sendMember.gender !== state.gender)
      ){
      NotionApi.updateData(state.name, state.join, state.year, state.etc, state.gender, sendMember.id)
      dispatch(memberUpdate({
        properties: {
          이름: {"title": [{'plain_text': state.name}]},
          가입일: {"date": {"start": state.join}},
          년생: {"rich_text": [{'plain_text': state.year}]},
          비고: {"rich_text": [{'plain_text': state.etc}]},
          성별: {"rich_text": [{'plain_text': state.gender}]},
        },
        id: sendMember.id
      }))
      dispatch(toggleModal())
    }else if(sendMember.state){
      dispatch(toggleModal())
    }
    
    //신규회원 추가
    if(
      state.name !== '' &&
      state.join !== '' &&
      state.year !== '' &&
      state.gender !== '' &&
      !sendMember.state
      ){
      NotionApi.postData(state.name, state.join, state.year, state.etc, state.gender)
      dispatch(memberUpdate({
        properties: {
          이름: {"title": [{'plain_text': state.name}]},
          가입일: {"date": {"start": state.join}},
          년생: {"rich_text": [{'plain_text': state.year}]},
          비고: {"rich_text": [{'plain_text': state.etc}]},
          성별: {"rich_text": [{'plain_text': state.gender}]}
        }
      }))
      Swal.fire({
        icon: 'success',
        title: `${state.name}님이 회원으로 추가되었어요!`,
        showConfirmButton: false,
        timer: 800
      })
      dispatch(toggleModal())
    } else if(!sendMember.state) {
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
          NotionApi.deleteData(id)
          dispatch(memberDelete({id}))
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
      <JoinModalContainer>
        <form onSubmit={handleSubmit}>
          <p>이름</p>
          <input type="text" value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder="이름을 입력하세요."></input>
          <p>가입일</p>
          <input type="date" value={state.join} onChange={e => setState({...state, join: e.target.value})} placeholder="날짜를 선택해주세요."></input>
          <p>년생</p>
          <select value={state.year} onChange={e => setState({...state, year: e.target.value})}>
            <option value=''>년생 선택</option>
            {dummyArray.map((v, i) => (
              <option key={i} value={i + 1988}>{i + 1988 + v}</option>
            ))}
          </select>
          <p>성별</p>
          <select value={state.gender} onChange={e => setState({...state, gender: e.target.value})}>
            <option value={''}>성별 선택</option>
            <option value={'남'}>남</option>
            <option value={'여'}>여</option>
          </select>
          <p>비고</p>
          <input type="text" value={state.etc} onChange={e => setState({...state, etc: e.target.value})} placeholder="비고(없을 경우 공란)"></input>
          <input type="submit" value="완료"></input>
        </form>
        <div className="cancle" onClick={() => {cancleMember()}}>취소</div>
        {sendMember.state ? <div className="delete" onClick={() => {deleteMenber(sendMember.id)}}>회원정보 삭제</div> : null}
      </JoinModalContainer>
    </JoinModalWrapper>
  )
}

export default MemberModal