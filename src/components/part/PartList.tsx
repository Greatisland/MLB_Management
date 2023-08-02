import { useAppSelector, useAppDispatch } from "../../store/hook"
import { StyledFaCrown, StyledFaStar } from "../../style/homeStyled"
import { sortState } from "../../store/slice"
import { DangerText, PartListContainer, SearchBarPart, TagExplain } from "../../style/partPageStyled"
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

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  return (
    <>
    <SearchBarPart onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."/>
    </SearchBarPart>
    <TagExplain>
      <span className="exp">모임장
      <StyledFaCrown bgColor='#ffac4c' className='iconExp' />
      </span>
      <span className="exp">운영진
      <StyledFaStar bgColor='#fc7b7b' className='iconExp' />
      </span>
      <span className="exp">
        최근 참석 상위권 (지난 3개월 기준)
        <span className="tagHot">Hot</span>
      </span>
    </TagExplain>
    <PartListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>정렬 | 이름</th>
            <th onClick={() => {dispatch(sortState('yearPart'))}}>올해 참석</th>
            <th onClick={() => {dispatch(sortState('monthPart'))}}>이번달 참석</th>
            <th onClick={() => {dispatch(sortState('aver'))}}>평균 참석</th>
          </tr>
        </thead>
        <tbody>
        {searchMembersData.map((member, i) => {
          let memberJoin = new Date(member[1].join)
          let memberCome: Date | null = member[1].comeback ? new Date(member[1].comeback) : null
          let joinMonth = memberJoin.getMonth() + 1
          let joinYear = String(memberJoin.getFullYear())
          let comeMonth = memberCome ? memberCome?.getMonth() + 1 : 0
          let comeYear = memberCome ? memberCome?.getFullYear() || 0 : 0

          let hotCount = ((member[1] as any)[`${dateCalc('flatMonth')}month`] + 
          (member[1] as any)[`${Number(dateCalc('flatMonth')) - 1}month`] +
          (member[1] as any)[`${Number(dateCalc('flatMonth')) - 2}month`])

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
                )) ? <span className="tagNew">신입</span> : null
              }{
                comeYear === currentYear && (comeMonth === currentMonth || comeMonth + 1 === currentMonth || comeMonth + 2 === currentMonth) ? 
                <span className="tagBack">복귀</span> :
                null
              }
              {hotCount >= 15 ?
               <span className="tagHot">Hot</span> : null}
              </div>
            </td>
            <td>{member[1].total || 0} 회</td>
            <td>{(member[1] as any)[`${dateCalc('flatMonth')}month`] || 0} 회</td>
            <td>{averCheck(member[1])} 회</td>
          </tr>
        )})}
        </tbody>
      </table>
    </PartListContainer>
    </>
  )
}

export default PartList