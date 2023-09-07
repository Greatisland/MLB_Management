import type { Member } from "../../store/slice"
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

  //벙 개설 횟수로 정렬
  const sortedArray = [...members].sort((a, b) => {
    const aMonthHost = a[1][`${Number(dateCalc('flatMonth'))}monthHost`] || 0
    const bMonthHost = b[1][`${Number(dateCalc('flatMonth'))}monthHost`] || 0
    return bMonthHost - aMonthHost
  })

  //벙 개설 횟수 0인 회원은 명단에서 삭제
  const dataLabels = sortedArray.filter(val => val[1][`${Number(dateCalc('flatMonth'))}monthHost`])

  //x축 (이름)
  const labels = dataLabels.map(val => val[1].name)

  //y축 (개설횟수)
  const yLabels = dataLabels.map(val => val[1][`${Number(dateCalc('flatMonth'))}monthHost`])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${dateCalc('flatMonth')}월 벙 개설 랭킹`
      },
    },
    scales: {
      y: {
        min: 0,
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
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Bar options={options} data={data} />
      <p>벙 개설 랭킹 그래프입니다.</p>
    </GraphAttendContainer>
  )
}

export default HostRanking