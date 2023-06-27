import { useAppSelector, useAppDispatch } from "../store/hook"
import { sortState } from "../store/slice"
import { PartListContainer } from "../style/PartPageStyled"
import { dateCalc } from "./dateCalc"
import { togglePartModal, sendMember } from "../store/slice"

const PartList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()


  return (
    <PartListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>이름</th>
            <th onClick={() => {dispatch(sortState('yearPart'))}}>올해 참석</th>
            <th onClick={() => {dispatch(sortState('monthPart'))}}>이번달 참석</th>
            <th onClick={() => {dispatch(sortState('yearHost'))}}>벙 개설</th>
          </tr>
        </thead>
        <tbody>
        {membersData.map((member, i) => (
          <tr key={i} onClick={() => {dispatch(togglePartModal()), dispatch(sendMember({id: member[0]}))}}>
            <td>{member[1].name}</td>
            <td>{member[1].total || 0} 회</td>
            <td>{(member[1] as any)[`${dateCalc('flatMonth')}month`] || 0} 회</td>
            <td>{member[1].totalHost || 0} 회</td>
          </tr>
        ))}
        </tbody>
      </table>
    </PartListContainer>
  )
}

export default PartList