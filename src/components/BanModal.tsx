import { dbFunc } from "../firebase/firebaseFunc"
import { JoinModalContainer, JoinModalWrapper } from "../style/headerStyle"
import { useState } from "react"
import { useAppSelector } from "../store/hook"

interface Props {
  setIsModal: (value: boolean) => void
}

const BanModal = ({setIsModal}: Props) => {
  const { sendBan } = useAppSelector(state => state.membersData)
  const today = new Date()
  const formattedDate = today.toISOString().substring(0, 10)

  const [ data, setData ] = useState({
    name: sendBan.name || '',
    date: sendBan.date || formattedDate,
    content: sendBan.content ||''
  })

  const handleBan = (e: React.FormEvent) => {
    e.preventDefault()
    const addBan = {
      name: data.name, date: data.date, content: data.content
    }
    if(sendBan.state){
      dbFunc.updateBan(sendBan.id as string, addBan)
      setIsModal(false)
    }else{
      dbFunc.addBan(addBan)
      setIsModal(false)
    }
  }

  return (
    <JoinModalWrapper>
      <JoinModalContainer>
        <form onSubmit={handleBan}>
          <p>이름</p>
          <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
          <p>추가일</p>
          <input type="date" value={data.date} onChange={(e) => setData({...data, date: e.target.value})}/>
          <p>사유</p>
          <input type="text" value={data.content} onChange={(e) => setData({...data, content: e.target.value})}/>
          <input type="submit" value="완료"></input>
        </form>
        <div className="btnWrapper">
          <div className="cancle" onClick={() => {setIsModal(false)}}>취소</div>
          {sendBan.state ? <div className="delete" onClick={() => {dbFunc.removeBan(sendBan.id as string), setIsModal(false)}}>삭제</div> : null}
        </div>
      </JoinModalContainer>
    </JoinModalWrapper>
  )
}

export default BanModal