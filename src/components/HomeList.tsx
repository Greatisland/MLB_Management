import { HomeListContainer } from "../style/homeStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember } from "../store/slice"

const HomeList = () => {
  const dispatch = useAppDispatch()

  const { membersData } = useAppSelector(state => state.membersData)
  return (
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>가입일</th>
            <th>년생</th>
            <th>비고</th>
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
                etc: member.properties.비고.rich_text[0] ? member.properties.비고.rich_text[0].plain_text : null,
                state: true
              }
              ))}}>
              <td>{member.properties.이름.title[0].plain_text}</td>
              <td>{member.properties.가입일.date.start}</td>
              <td>{member.properties.년생.rich_text[0].plain_text}</td>
              <td>{member.properties.비고.rich_text[0]?member.properties.비고.rich_text[0].plain_text:null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer>
  )
}

export default HomeList