import { JoinModalContainer, JoinModalWrapper } from "../style/headerStyle"
import { NotionApi } from "../api/NotionApi"
import { useState } from "react"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, getMembersData } from "../store/slice"


const MemberModal = () => {
  const dispatch = useAppDispatch()
  const { sendMember } = useAppSelector(state => state.membersData)
  const [state, setState] = useState({
    name: sendMember.name || '',
    join: sendMember.join || '',
    year: sendMember.year || '',
    etc: sendMember.etc || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(sendMember.state){
      NotionApi.updateData(state.name, state.join, state.year, state.etc, sendMember.id)
    }else{
      NotionApi.postData(state.name, state.join, state.year, state.etc)
    }
    dispatch(getMembersData())
    dispatch(toggleModal())
  }

  const deleteMenber = (id: string) => {
    NotionApi.deleteData(id)
    dispatch(getMembersData())
    dispatch(toggleModal())
  }

  return (
    <JoinModalWrapper>
      <JoinModalContainer>
        <form onSubmit={handleSubmit}>
          <input type="text" value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder="이름을 입력하세요."></input>
          <input type="date" value={state.join} onChange={e => setState({...state, join: e.target.value})}></input>
          <input type="text" value={state.year} onChange={e => setState({...state, year: e.target.value})} placeholder="출생년도를 입력하세요."></input>
          <input type="text" value={state.etc} onChange={e => setState({...state, etc: e.target.value})} placeholder="비고(없을 경우 공란)"></input>
          <input type="submit" value="완료"></input>
        </form>
        <div onClick={() => {deleteMenber(sendMember.id)}}>회원정보 삭제</div>
      </JoinModalContainer>
    </JoinModalWrapper>
  )
}

export default MemberModal