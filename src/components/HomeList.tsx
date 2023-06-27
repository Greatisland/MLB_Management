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
            <th onClick={() => {dispatch(sortState('etc'))}}>메모</th>
          </tr>
        </thead>
        <tbody>
          {membersData.map((member, i) => (
            <tr key={i} onClick={() => {dispatch(toggleModal()), dispatch(sendMember(
              {
                id: member[0],
                name: member[1].name,
                join: member[1].join,
                year: member[1].year,
                gender: member[1].gender,
                etc: member[1].etc || '',
                state: true,
                special: member[1].special 
              }
            ))}}>
              <td>{member[1].name}</td>
              <td>{member[1].join}</td>
              <td>{member[1].year.slice(2)}</td>
              <td>{member[1].etc || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomeListContainer>
  )
}

export default HomeList