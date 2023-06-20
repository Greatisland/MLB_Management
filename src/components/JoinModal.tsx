import { JoinModalContainer, JoinModalWrapper } from "../style/headerStyle"
import { useState } from "react"

const JoinModal = () => {
  const [state, setState] = useState({
    name: '',
    date: '',
    birth: '',
    etc: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //이제 이 state값으로 api.postDate호출하면 됨
  }

  return (
    <JoinModalWrapper>
      <JoinModalContainer>
        <form onSubmit={handleSubmit}>
          <input type="text" value={state.name} onChange={e => setState({...state, name: e.target.value})} placeholder="이름을 입력하세요."></input>
          <input type="date" value={state.date} onChange={e => setState({...state, date: e.target.value})}></input>
          <input type="text" value={state.birth} onChange={e => setState({...state, birth: e.target.value})} placeholder="출생년도를 입력하세요."></input>
          <input type="text" value={state.etc} onChange={e => setState({...state, etc: e.target.value})} placeholder="비고(없을 경우 공란)"></input>
          <input type="submit">완료</input>
        </form>
      </JoinModalContainer>
    </JoinModalWrapper>

  )
}

export default JoinModal