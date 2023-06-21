import { JoinModalContainer, JoinModalWrapper } from "../style/headerStyle"
import { NotionApi } from "../api/NotionApi"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, memberUpdate, memberDelete } from "../store/slice"


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
    if(
      sendMember.name !== state.name ||
      sendMember.join !== state.join ||
      sendMember.year !== state.year ||
      sendMember.etc !== state.etc ||
      sendMember.gender !== state.gender
      ){
      if(sendMember.state){
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
      }else{
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
      }
    }
    dispatch(toggleModal())
  }

  const deleteMenber = (id: string) => {
    NotionApi.deleteData(id)
    dispatch(memberDelete({id}))
    dispatch(toggleModal())
  }

  const dummyArray = new Array(15).fill('년생')

  return (
    <JoinModalWrapper>
      <JoinModalContainer>
        <form onSubmit={handleSubmit}>
          <input type="text" value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder="이름을 입력하세요."></input>
          <input type="date" value={state.join} onChange={e => setState({...state, join: e.target.value})}></input>
          <select value={state.year} onChange={e => setState({...state, year: e.target.value})}>
            {dummyArray.map((v, i) => (
              <option key={i} value={i + 1988}>{i + 1988 + v}</option>
            ))}
          </select>
          <input type="text" value={state.etc} onChange={e => setState({...state, etc: e.target.value})} placeholder="비고(없을 경우 공란)"></input>
          <select value={state.gender} onChange={e => setState({...state, gender: e.target.value})}>
            <option value={'남'}>남</option>
            <option value={'여'}>여</option>
          </select>
          <input type="submit" value="완료"></input>
        </form>
        <div onClick={() => {deleteMenber(sendMember.id)}}>회원정보 삭제</div>
      </JoinModalContainer>
    </JoinModalWrapper>
  )
}

export default MemberModal