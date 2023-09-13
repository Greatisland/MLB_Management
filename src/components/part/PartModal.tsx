import { PartModalContainer, PartModalWrapper } from "../../style/partPageStyled.tsx"
import ChartGraph from "./ChartGraph.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { togglePartModal, startSwiping, stopSwiping } from "../../store/slice.ts"
import { dateCalc } from "../common/dateCalc.ts"
import { averCheck } from "../common/averCheck.ts"
import { useEffect } from "react"

const PartModal = () => {
  const dispatch = useAppDispatch()
  const { membersData, sendMember } = useAppSelector(state => state.membersData)
  
  //좌우 스와이프 페이지이동 컨트롤 (페이지 오픈시 비활성, 페이지 벗어날 시 활성)
  useEffect(() => {
    dispatch(stopSwiping())
    return () => {
      dispatch(startSwiping())
    }
  }, [])

  const thisMember = membersData.find(member => {
    return member[0] === sendMember.id
  })

  if (!thisMember) {
    throw new Error('Member not found');
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