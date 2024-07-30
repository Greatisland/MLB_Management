import { HomeListContainer, StyledFaCrown, StyledFaStar, TabBtnContainer, TabBtn, SelectBox } from "../../style/homeStyled.tsx"
import { TagExplain } from "../../style/partPageStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { toggleModal, sendMember, sortState } from "../../store/slice.ts"
import { MdDeleteOutline } from "react-icons/md";
import { SearchBarPart } from "../../style/partPageStyled.tsx"
import { dateCalc } from "../../lib/dateCalc.ts"
import { useEffect, useState } from "react"
import { newFaceCheck } from "../../lib/newFaceCheck.ts"
import { oldFaceCheck } from "../../lib/oldFaceCheck.ts"
import { hotCount } from "../../lib/hotCount.ts"
import { dbFunc } from "../../firebase/firebaseFunc.ts"
import Swal from "sweetalert2"

import { totalCalcFunc } from "../../lib/totalCalcFunc.ts";

const HomeList = () => {
  const dispatch = useAppDispatch()
  const { membersData, loginUser, accountList, yearView, monthView } = useAppSelector(state => state.membersData)
  const [ search, setSearch ] = useState('')
  const [ isTab, setIsTab ] = useState(0)

  interface SortedProps {
    0: string,
    1: {
      name: string,
      level: number
    }
  }
  const [ sortedAccounts, setSortedAccounts ] = useState<SortedProps[]>([])

  useEffect(() => {
    // accountList의 복사본을 생성하여 정렬
    const sortedAccountList = [...accountList].sort((a, b) => {
      return b[1].level - a[1].level;
    });
  
    // 정렬된 배열로 상태 업데이트
    setSortedAccounts(sortedAccountList);
  }, [accountList]); // accountList가 변경될 때마다 이 효과를 다시 실행

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

  const DeleteNotice = (name: string, memberId: string) => {
    Swal.fire({
      title: `${name}의 계정을 삭제할까요?`,
      html: `계정 삭제는 회원 삭제와 별개에요! `,
      showDenyButton: true,
      confirmButtonText: "삭제",
      denyButtonText: `취소`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dbFunc.removeAccount(memberId)
        Swal.fire("삭제완료!", "", "success");
      }
    });
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
    {loginUser.level >= 2 && <TabBtnContainer>
      <TabBtn isTab={isTab === 0 && true} onClick={() => setIsTab(0)}>회원</TabBtn>
      <TabBtn isTab={isTab === 1 && true} onClick={() => setIsTab(1)}>계정</TabBtn>
    </TabBtnContainer>}
    {isTab === 0 ?
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
            const memberJoin = new Date(member[1].join)
            const memberCome: Date | null = member[1].comeback ? new Date(member[1].comeback) : null
            const joinMonth = memberJoin.getMonth() + 1
            const joinYear = memberJoin.getFullYear()
            const comeMonth = memberCome ? memberCome?.getMonth() + 1 : 0
            const comeYear = memberCome ? memberCome?.getFullYear() || 0 : 0
            
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
                {hotCount(yearView, monthView, member[1], true) >= 15 ?
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
    : 
    <HomeListContainer>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>계정권한</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
        {sortedAccounts?.map((account, i) => (
          <tr key={i}>
            <td>{account[1].name}</td>
            <td>
              <SelectBox 
                value={account[1].level}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  dbFunc.updateAccount(account[0], {
                    name: account[1].name,
                    level: e.target.value
                  })
                }}
              >
                {/* {loginUser.level >= 4 && <option value={4}>모임장</option>} */}
                <option value={4}>모임장</option>
                <option value={3}>총무</option>
                <option value={2}>운영진</option>
                <option value={1}>일반회원</option>
                <option value={0}>가입 미승인</option>
              </SelectBox>
            </td>
            <td 
              className='delete'
              onClick={() => DeleteNotice(account[1].name, account[0])}
            ><MdDeleteOutline />계정삭제</td>
          </tr>
        ))}
        </tbody>
      </table>
    </HomeListContainer>}
    </>
  )
}

export default HomeList