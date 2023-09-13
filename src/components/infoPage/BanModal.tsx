import { dbFunc } from "../../firebase/firebaseFunc.ts"
import { JoinModalContainer, JoinModalWrapper } from "../../style/headerStyle.tsx"
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { startSwiping, stopSwiping } from "../../store/slice.ts"

interface Props {
  setIsModal: (value: boolean) => void
}

const BanModal = ({setIsModal}: Props) => {
  const dispatch = useAppDispatch()
  const { sendBan } = useAppSelector(state => state.membersData)
  const today = new Date()
  const formattedDate = today.toISOString().substring(0, 10)

  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])

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
      dispatch(startSwiping())
    }else{
      dbFunc.addBan(addBan)
      setIsModal(false)
      dispatch(startSwiping())
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
          <div className="cancle" onClick={() => {setIsModal(false), dispatch(startSwiping())}}>취소</div>
          {sendBan.state ? <div className="delete" onClick={() => {dbFunc.removeBan(sendBan.id as string), setIsModal(false)}}>삭제</div> : null}
        </div>
      </JoinModalContainer>
    </JoinModalWrapper>
  )
}

export default BanModal