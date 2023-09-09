import type { Member } from "../../store/slice.ts"
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
import { yellow } from "@mui/material/colors";
interface Props {
  members: [string, Member][]
}


const LatestHostRanking = ({members} : Props) => {

  //벙 개설 횟수로 정렬
  const sortedArray = [...members].sort((a, b) => {
    const aMonthHost = a[1][`${Number(dateCalc('flatMonth')) - 1}monthHost`] || 0
    const bMonthHost = b[1][`${Number(dateCalc('flatMonth')) - 1}monthHost`] || 0
    return bMonthHost - aMonthHost
  })

  //벙 개설 횟수 0인 회원은 명단에서 삭제
  const dataLabels = sortedArray.filter(val => val[1][`${Number(dateCalc('flatMonth')) - 1}monthHost`])

  //x축 (이름)
  const labels = dataLabels.map(val => val[1].name)

  //y축 (개설횟수)
  const yLabels = dataLabels.map(val => val[1][`${Number(dateCalc('flatMonth')) - 1}monthHost`])
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
        text: `지난달 ${Number(dateCalc('flatMonth')) - 1}월 벙 개설 횟수`
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
          'rgba(255, 92, 86, 0.4)',
          'rgba(235, 90, 54, 0.4)',
          'rgba(255, 150, 102, 0.4)',
          'rgba(255, 99, 208, 0.4)',
          'rgba(236, 130, 43, 0.4)',
          'rgba(228, 182, 31, 0.4)',
          'rgba(212, 224, 36, 0.4)', // 편안한 민트
          'rgba(255, 159, 64, 0.4)',  // 주황색
          'rgba(205, 85, 85, 0.4)',   // 로즈
          'rgba(132, 112, 255, 0.4)'  // 라이트 퍼플
        ]
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Bar options={options} data={data} />
    </GraphAttendContainer>
  )
}

export default LatestHostRanking