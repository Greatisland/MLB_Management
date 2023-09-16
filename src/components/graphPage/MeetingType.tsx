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
  const labels = ['노래벙', '친목벙', '운동벙 ', '버스킹', '이벤트벙', '정모', '운영진회의', '기타']
  const [ nowMonthNumber, setNowMonthNumber ] = useState(Number(dateCalc('flatMonth')))

  //비동기 오류때문에 삼항연산자로 값 가져옴
  let nowMonthData = (meet[nowMonthNumber - 1] && meet[nowMonthNumber - 1][1]) ? meet[nowMonthNumber - 1][1] : []

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
      case '정모' : total[5]++
      break
      case '운영진회의' : total[6]++
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
          'rgba(235, 196, 66, 0.2)',  // 밝은 주황색
          'rgba(34, 142, 215, 0.2)',  // 밝은 파란색
          'rgba(143, 92, 245, 0.2)',  // 밝은 자주색
          'rgba(235, 39, 39, 0.2)',   // 밝은 빨간색
          'rgba(108, 108, 108, 0.2)', // 중간 회색
          'rgba(0, 235, 107, 0.2)',   // 밝은 녹색
          'rgba(0, 206, 209, 0.2)',   // 밝은 청록색
          'rgba(225, 205, 30, 0.2)'   // 노란색
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',    // 밝은 주황색
          'rgba(54, 162, 235, 1)',   // 밝은 파란색
          'rgba(153, 102, 255, 1)',  // 밝은 자주색
          'rgba(255, 59, 59, 1)',    // 밝은 빨간색
          'rgba(128, 128, 128, 1)',  // 중간 회색
          'rgba(0, 255, 127, 1)',    // 밝은 녹색
          'rgba(11, 231, 235, 1)',   // 밝은 청록색
          'rgba(245, 225, 50, 1)'    // 노란색
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