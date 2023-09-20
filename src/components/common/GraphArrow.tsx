import { GraphBtn } from "../../style/graphPageStyled.tsx"
import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { setYearView, setMonthView } from "../../store/slice.ts"
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';

interface Props {
  isMonth?: boolean
}

const GraphArrow = ({isMonth} : Props) => {
  const dispatch = useAppDispatch()
  const { yearView, monthView } = useAppSelector(state => state.membersData)
  return (
    <GraphBtn>
      <div className="year">
        <BiLeftArrow onClick={() => {
          if(yearView > 2017) {
            dispatch(setYearView(yearView - 1))
        }}}/>
        <p>{yearView}년</p>
        <BiRightArrow onClick={() => {
          if(yearView < new Date().getFullYear()) {
            dispatch(setYearView(yearView + 1))
        }}}/>
      </div>
      {isMonth ? 
        <div className="month">
          <BiLeftArrow onClick={() => {
            if (monthView > 1) {
              dispatch(setMonthView(monthView - 1))
            }else if(monthView === 1){
              if(yearView > 2017) {
                dispatch(setYearView(yearView - 1))
                dispatch(setMonthView(12))
              }
            }
          }}/>
          <p>{monthView}월</p>
          <BiRightArrow onClick={() => {
            if (monthView < 12) {
              dispatch(setMonthView(monthView + 1))
            }else if(monthView === 12){
              if(yearView < new Date().getFullYear()) {
                dispatch(setYearView(yearView + 1))
                dispatch(setMonthView(1))
              }
            }
          }}/>
        </div> : null
      }

      </GraphBtn>
  )
}

export default GraphArrow