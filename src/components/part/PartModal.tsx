import { PartModalContainer, PartModalWrapper } from "../../style/partPageStyled.tsx"
import ChartGraph from "./ChartGraph.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { togglePartModal, startSwiping, stopSwiping } from "../../store/slice.ts"
import { useEffect } from "react"
import GraphArrow from "../common/GraphArrow.tsx"

const PartModal = () => {
  const dispatch = useAppDispatch()
  const { membersData, sendMember, yearView } = useAppSelector(state => state.membersData)
  
  const date = new Date()

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
  let total = 0
  let aver = 0
  let host = 0
  if(thisMember && thisMember[1] && thisMember[1].attend){
    const att = thisMember?.[1]?.attend?.[yearView]

    if (att) {
      total = Object.values(att).reduce((acc, val) => acc + val, 0)
      aver = Math.round(total / Object.values(att).length * 10) / 10
    }
  }
  if(thisMember && thisMember[1] && thisMember[1].host){
    const att = thisMember?.[1]?.host?.[yearView]

    if (att) {
      host = Object.values(att).reduce((acc, val) => acc + val, 0)
    }
  }

  if (!thisMember) {
    throw new Error('Member not found');
  }
  
  return (
    <PartModalWrapper>
      <PartModalContainer>
        <ChartGraph member={thisMember[1]} aver={aver}/>
        <GraphArrow />
        <div className="textArea">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>{thisMember?.[1] ? thisMember[1].name : 'null'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{yearView}년 총 참석</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>{yearView}년 펑균 참석율</td>
                <td>{aver}</td>
              </tr>
              <tr>
                <td>{yearView}년 벙 개설횟수</td>
                <td>{host}</td>
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