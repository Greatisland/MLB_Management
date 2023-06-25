import { HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember, sortState } from "../store/slice"
import { dbFunc } from "../firebase/firebaseFunc"
import { useState, useEffect } from "react";

const HomeList = () => {
  const dispatch = useAppDispatch()
  const { membersData } = useAppSelector(state => state.membersData)

  const [members, setMembers] = useState([])

  useEffect(() => {
    dbFunc.getAllMembers(setMembers)
  }, [])

  return (
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>이름</th>
            <th onClick={() => {dispatch(sortState('join'))}}>가입일</th>
            <th onClick={() => {dispatch(sortState('year'))}}>년생</th>
            <th onClick={() => {dispatch(sortState('etc'))}}>비고</th>
          </tr>
        </thead>
        {/* <tbody>
          {membersData?.map((member, i) => (
            <tr key={i} onClick={() => {dispatch(toggleModal()), dispatch(sendMember(
              {
                id: member.id, 
                archived: member.archived,
                name: member.properties.이름.title[0].plain_text,
                join: member.properties.가입일.date.start,
                year: member.properties.년생.rich_text[0].plain_text,
                gender: member.properties.성별.rich_text[0].plain_text,
                etc: member.properties.비고.rich_text[0] ? member.properties.비고.rich_text[0].plain_text : null,
                state: true
              }
              ))}}>
              <td>{member.properties.이름.title[0].plain_text}</td>
              <td className="date">{member.properties.가입일.date.start}</td>
              <td>{member.properties.년생.rich_text[0].plain_text.substring(2)}</td>
              <td className="etc">{member.properties.비고.rich_text[0] ? member.properties.비고.rich_text[0].plain_text : null}</td>
            </tr>
          ))}
        </tbody> */}
        <tbody>
          {members.map((member, i) => (
            <tr key={i}>
              <td>{member[1].name}</td>
              <td>{member[1].join}</td>
              <td>{member[1].year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div onClick={() => {dbFunc.addMember({name: '섹스', year: 2002})}}>추가테스트</div>
      <div onClick={() => {dbFunc.removeMember('-NYbLLt098IeMiQg7Ywf')}}>삭제테스트</div>
      <div onClick={() => {dbFunc.addMember({name: '섹스', year: 2002})}}>수정테스트</div>
    </HomeListContainer>
  )
}

export default HomeList