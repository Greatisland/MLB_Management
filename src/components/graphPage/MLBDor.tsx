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


const MLBDor = ({members} : Props) => {


  const AwardSort = [...members].sort((a, b) => {
    let aOne = a[1]?.awardCount.fClass || 0
    let aTwo = a[1]?.awardCount.sClass || 0
    let bOne = b[1]?.awardCount.fClass || 0
    let bTwo = b[1]?.awardCount.sClass || 0
    return (bOne * 2 + bTwo) - (aOne * 2 + aTwo)
  })

  //x축
  const basicLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const labels = basicLabels.slice(0, Number(dateCalc('flatMonth')))
  
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `전체통계 - 총 참석`
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
        label: '참석 횟수',
        data: totality,
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Bar options={options} data={data} />
      <p>모임에서 몇 번의 참석이 있었는지 확인합니다.</p>
    </GraphAttendContainer>
  )
}

export default MLBDor