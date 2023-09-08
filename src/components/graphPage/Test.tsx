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


const Test = ({members} : Props) => {

  //벙 개설 횟수로 정렬
  const sortedArray = [...members].sort((a, b) => {
    const aMonthHost = a[1][`${Number(dateCalc('flatMonth'))}monthHost`] || 0
    const bMonthHost = b[1][`${Number(dateCalc('flatMonth'))}monthHost`] || 0
    return bMonthHost - aMonthHost
  })

  //벙 개설 횟수 0인 회원은 명단에서 삭제
  const dataLabels = sortedArray.filter(val => val[1][`${Number(dateCalc('flatMonth'))}monthHost`])

  //x축 (월)
  const basicLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const labels = basicLabels.slice(0, Number(dateCalc('flatMonth')))

  //y축 (개설횟수)
  const yLabels = dataLabels.map(val => val[1][`${Number(dateCalc('flatMonth'))}monthHost`])
  const yMax = Math.max(...yLabels)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${dateCalc('flatMonth')}월 벙 개설 횟수`
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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
          'rgba(255, 206, 86, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(104, 104, 104, 0.8)',
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
      {/* <p>벙 개설 랭킹 그래프입니다.</p> */}
    </GraphAttendContainer>
  )
}

export default Test