import type { Member } from "../../store/slice.ts"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from 'react-chartjs-2';
import { dateCalc } from '../common/dateCalc';
import { GraphAttendContainer } from "../../style/graphPageStyled";
interface Props {
  members: [string, Member][]
}


const HostRanking = ({members} : Props) => {

  const [ nowMonthNumber, setNowMonthNumber ] = useState(Number(dateCalc('flatMonth')))

  //벙 개설 횟수로 정렬
  const sortedArray = [...members].sort((a, b) => {
    const aMonthHost = a[1][`${nowMonthNumber}monthHost`] || 0
    const bMonthHost = b[1][`${nowMonthNumber}monthHost`] || 0
    return bMonthHost - aMonthHost
  })

  //벙 개설 횟수 0인 회원은 명단에서 삭제
  const dataLabels = sortedArray.filter(val => val[1][`${nowMonthNumber}monthHost`])

  //x축 (이름)
  const labels = dataLabels.map(val => val[1].name)

  //y축 (개설횟수)
  const yLabels = dataLabels.map(val => val[1][`${nowMonthNumber}monthHost`])
  const yMax = Math.max(...yLabels)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${nowMonthNumber}월 벙 개설 횟수`
      },
    },
    scales: {
      y: {
        min: 0,
        max: yMax > 3 ? yMax : 3,
        ticks: {
          beginAtZero: true,
          stepSize: 1,
          precision: 0
        }
      },
      x: {
        ticks: {
          font: {
            // 일정 길이 이상되면 이름이 생략되는 문제때문에 삼항연산자 사용해서 폰트크기 줄임
            size: labels.length > 10 ? 8 : 12
          }
        }
      }
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: '벙 개설 횟수',
        data: yLabels,
        backgroundColor: [
          'rgba(255, 92, 86, 0.8)',
          'rgba(235, 90, 54, 0.8)',
          'rgba(255, 150, 102, 0.8)',
          'rgba(255, 99, 208, 0.8)',
          'rgba(236, 130, 43, 0.8)',
          'rgba(64, 255, 223, 0.8)',
          'rgba(75, 192, 192, 0.8)', // 편안한 민트
          'rgba(255, 159, 64, 0.8)',  // 주황색
          'rgba(205, 85, 85, 0.8)',   // 로즈
          'rgba(132, 112, 255, 0.8)'  // 라이트 퍼플
        ],
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Bar options={options} data={data} />
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
    </GraphAttendContainer>
  )
}

export default HostRanking