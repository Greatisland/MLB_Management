import { HomeListContainer, StyledFaCrown, StyledFaStar } from "../../style/homeStyled.tsx"
import { TagExplain } from "../../style/partPageStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleModal, sendMember, sortState } from "../../store/slice.ts"
import { SearchBarPart } from "../../style/partPageStyled.tsx"
import { dateCalc } from "../../lib/dateCalc.ts"
import { useState } from "react"
import { newFaceCheck } from "../../lib/newFaceCheck.ts"
import { oldFaceCheck } from "../../lib/oldFaceCheck.ts"
import { hotCount } from "../../lib/hotCount.ts"

const HomeList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
  const [ search, setSearch ] = useState('')

  //가입 승인상태이고 휴식기가 아니고 가입대기가 아닐 때
  const searchMembersData = membersData.filter(member => 
    member[1]?.name?.includes(search) && 
    !member[1].break &&
    member[1].join
  )

  const handleAddMember = (member: any) => {
    dispatch(toggleModal()), dispatch(sendMember(
      {
        id: member[0],
        name: member[1].name,
        join: member[1].join,
        year: member[1].year,
        birth: member[1].birth || '',
        gender: member[1].gender,
        etc: member[1].etc || '',
        state: true,
        pay: member[1].pay || false,
        special: member[1].special,
        break: member[1].break || false,
        approval: member[1].approval || false,
        comeback: member[1].comeback || '',
        awardCount: member[1].awardCount || null
      }
    ))
  }

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  return (
    <>
    <SearchBarPart onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."></input>
    </SearchBarPart>
    <TagExplain>
      <span className="exp">
        <StyledFaCrown bgColor='#ffac4c' />
        모임장
      </span>
      <span className="exp">
        <StyledFaStar bgColor='#fc7b7b' />
        운영진
      </span>
      <span className="exp">
        <span className="tagHot">Hot</span>
        최근 참석 상위권 (지난 3개월 기준)
      </span>
    </TagExplain>
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>정렬 | 이름</th>
            <th className="index">순번</th>
            <th onClick={() => {dispatch(sortState('join'))}}>가입일</th>
            <th onClick={() => {dispatch(sortState('year'))}}>년생</th>
            {loginUser.level >= 2 ?
            <th onClick={() => {dispatch(sortState('etc'))}}>메모</th>:null}
          </tr>
        </thead>
        <tbody>
          {searchMembersData.map((member, i) => {
            let memberJoin = new Date(member[1].join)
            let memberCome: Date | null = member[1].comeback ? new Date(member[1].comeback) : null
            let joinMonth = memberJoin.getMonth() + 1
            let joinYear = memberJoin.getFullYear()
            let comeMonth = memberCome ? memberCome?.getMonth() + 1 : 0
            let comeYear = memberCome ? memberCome?.getFullYear() || 0 : 0
            
            return (
            <tr key={i} onClick={() => handleAddMember(member)}>
              <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null
              }{member[1].name}
                <div className="tagContainer">
                {
                  newFaceCheck(joinYear, joinMonth) ? <span className="tagNew">신입</span> : null
                }{
                  oldFaceCheck(comeYear, comeMonth, currentYear, currentMonth) ?
                  <span className="tagBack">복귀</span> :
                  null
                }
                {hotCount(member[1]) >= 15 ?
                <span className="tagHot">Hot</span> : null}
                </div>
              </td>
              <td className="index">{i+1}</td>
              <td>{member[1].join.replace(/-/g, '.').slice(2)}</td>
              <td>{member[1].year.slice(2)}</td>
              {loginUser.level >= 2 ?
              <td className="tdmemo">{member[1].etc || ''}</td> : null}
            </tr>
          )})}
        </tbody>
      </table>
    </HomeListContainer>
    </>
  )
}

export default HomeList