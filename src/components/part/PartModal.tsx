import { PartModalContainer, PartModalWrapper } from "../../style/partPageStyled"
import ChartGraph from "./ChartGraph"
import { useAppSelector, useAppDispatch } from "../../store/hook"
import { togglePartModal } from "../../store/slice"
import { dateCalc } from "../common/dateCalc"
import type { Member } from "../../store/slice"

const PartModal = () => {
  const dispatch = useAppDispatch()
  const { membersData, sendMember } = useAppSelector(state => state.membersData)

  const thisMember = membersData.find(member => {
    return member[0] === sendMember.id
  })

  if (!thisMember) {
    throw new Error('Member not found');
  }

  //평균률 확인
  const averCheck = (member) => {
    let aver = {total: 0, count: 0, result: 0}

    //가입월 확인
    const thisDate = new Date(member.join)
    const date = new Date()
    let joinMonth = 0
    if(thisDate.getFullYear() === date.getFullYear()){
      joinMonth = thisDate.getMonth() + 1
    }
  
    //계산
    for (let i = joinMonth; i <= Number(dateCalc('flatMonth')); i++) {
      const monthValue = member[`${i}month` as keyof Member]
      aver.total += (monthValue ? Number(monthValue) : 0)
      aver.count++
    }
    
    //평균값이 첫재 소수점까지만 보이도록 
    return Math.floor((aver.result = aver.total / aver.count) * 10) / 10
  }
  
  return (
    <PartModalWrapper>
      <PartModalContainer>
        <ChartGraph member={thisMember[1]} aver={averCheck(thisMember[1])}/>
        <div className="textArea">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>{thisMember?.[1] ? thisMember[1].name : 'null'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dateCalc('year')}년 총 참석</td>
                <td>{thisMember?.[1] ? thisMember[1].total : 0}</td>
              </tr>
              <tr>
                <td>펑균 참석율</td>
                <td>{averCheck(thisMember[1])}</td>
              </tr>
              <tr>
                <td>벙 개설횟수</td>
                <td>{thisMember?.[1] ? thisMember[1].totalHost ? thisMember[1].totalHost : 0 : 0}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div onClick={() => dispatch(togglePartModal())} className="exit">나가기</div>
      </PartModalContainer>
    </PartModalWrapper>
  )
}

export default PartModal