import { useAppSelector, useAppDispatch } from "../store/hook"
import { sortState } from "../store/slice"
import { PartListContainer, SearchBarPart } from "../style/partPageStyled"
import { dateCalc } from "./dateCalc"
import { togglePartModal, sendMember } from "../store/slice"
import { useState } from "react"

const PartList = () => {
  const { membersData } = useAppSelector(state => state.membersData)
  //휴식기 제외
  const totalMember = membersData.filter(member => !member[1].break)
  const dispatch = useAppDispatch()

  const [ search, setSearch ] = useState('')

  const searchMembersData = totalMember.filter(member => member[1].name.includes(search))


  return (
    <>
    <SearchBarPart onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."/>
    </SearchBarPart>
    <PartListContainer>

      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>정렬 | 이름</th>
            <th onClick={() => {dispatch(sortState('yearPart'))}}>올해 참석</th>
            <th onClick={() => {dispatch(sortState('monthPart'))}}>이번달 참석</th>
            <th onClick={() => {dispatch(sortState('yearHost'))}}>벙 개설</th>
          </tr>
        </thead>
        <tbody>
        {searchMembersData.map((member, i) => (
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
    </>
  )
}

export default PartList