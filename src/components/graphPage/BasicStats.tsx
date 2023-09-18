import { BasicStatsContainer } from "../../style/graphPageStyled.tsx"
import type { Member, Meet } from "../../store/slice"
import { averCheck } from "../common/averCheck.ts"
import { monthsBetweenDates } from "../common/monthsBetweenDates.ts"

interface Props {
  membersData: [string, Member][],
  meetData: Meet[]
}

const BasicStats = ({meetData, membersData}: Props) => {

  //각 멤버 평균참석률의 평균값
  const totalMember = membersData.filter(member => !member[1].break && member[1].join)
  const allMemberAverAttend = Math.round(totalMember.reduce((acc, val) => {
    return acc + averCheck(val[1])
  }, 0)/totalMember.length * 100)/100

  //평균 나이
  const allMemberAverOld = Math.round(totalMember.reduce((acc, val) => {
    return acc + Number(val[1].year)
  }, 0)/totalMember.length) % 100

  //평균 가입기간
  const allMemberAverJoin = Math.round(totalMember.reduce((acc, val) => {
    const startDate = val[1].comeback ? new Date(val[1].comeback) : new Date(val[1].join)
    const now = new Date()
    return acc + monthsBetweenDates(startDate, now)
  }, 0)/totalMember.length)

  return (
    <BasicStatsContainer>
      <p className="title">전체 회원 통계</p>
      <div className='content'>
        <span className='content_title'>참석율</span>
        <span className='content_body'><span className="add_text">월</span>{allMemberAverAttend}<span className="add_text">회</span></span>
      </div>
      <div className='content'>
        <span className='content_title'>나이(연도)</span>
        <span className='content_body'><span className="add_text">평균</span>{allMemberAverOld}<span className="add_text">년생</span></span>
      </div>
      <div className='content'>
        <span className='content_title'>가입 기간</span>
        <span className='content_body'><span className="add_text">평균</span>{allMemberAverJoin}<span className="add_text">개월</span></span>
      </div>
    </BasicStatsContainer>
  )
}

export default BasicStats