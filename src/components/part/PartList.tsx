import { useAppSelector, useAppDispatch } from "../../store/hook"
import { StyledFaCrown, StyledFaStar } from "../../style/homeStyled"
import { sortState } from "../../store/slice"
import { DangerText, PartListContainer, SearchBarPart } from "../../style/partPageStyled"
import { dateCalc } from "../common/dateCalc"
import { averCheck } from "../common/averCheck"
import { togglePartModal, sendMember } from "../../store/slice"
import { useState } from "react"

const PartList = () => {
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
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
            <th onClick={() => {dispatch(sortState('aver'))}}>평균 참석</th>
            {/* <th onClick={() => {dispatch(sortState('yearHost'))}}>벙 개설</th> */}
          </tr>
        </thead>
        <tbody>
        {searchMembersData.map((member, i) => {
          let memberJoin = new Date(member[1].join)
          let joinMonth = memberJoin.getMonth() + 1
          let joinYear = String(memberJoin.getFullYear())
          if(joinYear === dateCalc('year') && (
            Number(joinMonth) >= (Number(dateCalc('flatMonth')) - 2)
          )){}
          return (
          loginUser.level >= 2 && member[1].danger ?
          <DangerText key={i} onClick={() => {dispatch(togglePartModal()), dispatch(sendMember({id: member[0]}))}}>
            <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null
                
              }{member[1].name}
              <div className="tagContainer">
                <span className="tagDanger">위험!</span>
              {//신입태그
                (joinYear === dateCalc('year') && (
                  Number(joinMonth) >= (Number(dateCalc('flatMonth')) - 2)
                )) ? <span className="tagNew">New!</span> : null
              }</div></td>
            <td>{member[1].total || 0} 회</td>
            <td>{(member[1] as any)[`${dateCalc('flatMonth')}month`] || 0} 회</td>
            <td>{averCheck(member[1])} 회</td>
            {/* <td>{member[1].totalHost || 0} 회</td> */}
          </DangerText>

          :

          <tr key={i} onClick={() => {dispatch(togglePartModal()), dispatch(sendMember({id: member[0]}))}}>
            <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null}
              {member[1].name}
              <div className="tagContainer">
              {
                //신입태그
                (joinYear === dateCalc('year') && (
                  Number(joinMonth) >= (Number(dateCalc('flatMonth')) - 2)
                )) ? <span className="tagNew">New!</span> : null
              }</div>
              {(member[1] as any)[`${dateCalc('flatMonth')}month`] >= 7 ?
               <span className="tagHot">Hot!</span> : null}
            </td>
            <td>{member[1].total || 0} 회</td>
            <td>{(member[1] as any)[`${dateCalc('flatMonth')}month`] || 0} 회</td>
            <td>{averCheck(member[1])} 회</td>
            {/* <td>{member[1].totalHost || 0} 회</td> */}
          </tr>
        )})}
        </tbody>
      </table>
    </PartListContainer>
    </>
  )
}

export default PartList