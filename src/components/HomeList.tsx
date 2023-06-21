import { HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember, sortState } from "../store/slice"

const HomeList = () => {
  const dispatch = useAppDispatch()

  const { membersData } = useAppSelector(state => state.membersData)
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
        <tbody>
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
        </tbody>
      </table>
    </HomeListContainer>
  )
}

export default HomeList