import { BanTopContainer, HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { Btn } from "../style/globalStyled"
import { useState } from "react"
import BanModal from "./BanModal"
import { sendBan } from "../store/slice"

const BanList = () => {
  const dispatch = useAppDispatch()
  const { banData, loginUser } = useAppSelector(state => state.membersData)
  const [ isModal, setIsModal ] = useState(false)
  
  return (
    <>{loginUser.level >= 2 ?
    <><BanTopContainer><h3>차단 리스트</h3><Btn onClick={() => {setIsModal(true), dispatch(sendBan({
      id: '', name: '', date: '', content: '', state: false
    }))}}><p>추가</p></Btn></BanTopContainer>
    {isModal ? <BanModal setIsModal={setIsModal}/> : null}
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>차단일</th>
            <th>사유</th>
          </tr>
        </thead>
        <tbody>
          {banData.map((member, i) => (
            <tr key={i} onClick={() => {setIsModal(true), dispatch(sendBan({
              id: member[0],
              name: member[1].name,
              date: member[1].date,
              content: member[1].content,
              state: true
            }))}}>
              <td>{member[1].name}</td>
              <td>{member[1].date.replace(/-/g, '.').slice(2)}</td>
              <td>{member[1].content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer></> :
    <></>}
    </>
  )
}

export default BanList