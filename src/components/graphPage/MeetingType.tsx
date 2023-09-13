import type { Meet } from "../../store/slice.ts"
import { useState } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Pie } from 'react-chartjs-2';
import { dateCalc } from '../common/dateCalc';
import { GraphAttendContainer } from "../../style/graphPageStyled";
interface Props {
  meet : Meet[]
}


const MeetingType = ({meet} : Props) => {
  //x축
  const labels = ['노래벙', '친목벙', '운동벙 ', '버스킹', '이벤트벙', '기타']
  const [ nowMonthNumber, setNowMonthNumber ] = useState(Number(dateCalc('flatMonth')))

  let nowMonthData = meet[nowMonthNumber - 1][1]

  //y축
  let total = new Array(labels.length).fill(0)

  //y축 데이터 바인딩
  nowMonthData.forEach(val => {
    switch(val.type){
      case '노래벙' : total[0]++
      break
      case '친목벙' : total[1]++
      break
      case '운동벙' : total[2]++
      break
      case '버스킹' : total[3]++
      break
      case '이벤트벙' : total[4]++
      break
      default : total[5]++
    }
  })
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${nowMonthNumber}월 열린 벙의 종류`
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: '열린 횟수',
        data: total,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(104, 104, 104, 0.2)',
          'rgba(64, 255, 223, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          '#8b8b8b',
          '#40ffd6',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <div className="arrow_container">
        <BsArrowLeftCircle onClick={() => {
          if (nowMonthNumber > 1) {
            setNowMonthNumber(nowMonthNumber - 1)
          }
        }} />
        <BsArrowRightCircle onClick={() => {
          if (nowMonthNumber < Number(dateCalc('flatMonth'))) {
            setNowMonthNumber(nowMonthNumber + 1)
          }
        }}/>
      </div>
      <Pie options={options} data={data} />
    </GraphAttendContainer>
  )
}

export default MeetingType