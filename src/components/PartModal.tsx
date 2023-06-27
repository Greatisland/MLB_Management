import { PartModalContainer, PartModalWrapper } from "../style/PartPageStyled"
import ChartGraph from "./ChartGraph"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { togglePartModal } from "../store/slice"
import { dateCalc } from "./dateCalc"

const PartModal = () => {
  const dispatch = useAppDispatch()
  const { membersData, sendMember } = useAppSelector(state => state.membersData)

  const thisMember = membersData.find(member => {
    return member[0] === sendMember.id
  })

  if (!thisMember) {
    throw new Error('Member not found');
  }
  
  return (
    <PartModalWrapper>
      <PartModalContainer>
        <ChartGraph member={thisMember[1]}/>
        <div className="textArea">
          <table>
            <thead>
              <tr>
                <th colSpan={2}>{thisMember?.[1] ? thisMember[1].name : 'null'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dateCalc('year')}년 참석</td>
                <td>{thisMember?.[1] ? thisMember[1].total : 0}</td>
              </tr>
              <tr>
                <td>{dateCalc('flatMonth')}월 참석</td>
                <td>{thisMember?.[1] ? (thisMember[1] as any)[`${dateCalc('flatMonth')}month`] : 0}</td>
              </tr>
              <tr>
                <td>벙 개설</td>
                <td>{thisMember?.[1] ? thisMember[1].totalHost : '0'}</td>
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