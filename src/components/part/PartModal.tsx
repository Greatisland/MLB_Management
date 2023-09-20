import { PartModalContainer, PartModalWrapper } from "../../style/partPageStyled.tsx"
import ChartGraph from "./ChartGraph.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { togglePartModal, startSwiping, stopSwiping } from "../../store/slice.ts"
import { useState, useEffect } from "react"
import { GraphBtn } from "../../style/graphPageStyled.tsx"
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

const PartModal = () => {
  const date = new Date()
  const dispatch = useAppDispatch()
  const { membersData, sendMember } = useAppSelector(state => state.membersData)
  const [ yearView, setYearView ] = useState(date.getFullYear())

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
        <ChartGraph member={thisMember[1]} aver={aver} yearView={yearView} />
        <GraphBtn>
          <div className="year">
            <BiLeftArrow onClick={() => {
              if(yearView > 2017) {
                setYearView(yearView - 1)
            }}}/>
            <p>{yearView}년</p>
            <BiRightArrow onClick={() => {
              if(yearView < new Date().getFullYear()) {
                setYearView(yearView + 1)
            }}}/>
          </div>
        </GraphBtn>
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