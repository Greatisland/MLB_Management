import type { Member } from "../../store/slice"
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
  members: [string, Member][]
}


const MeetingType = ({members} : Props) => {



  let totality = [2,1,2,2,0]

  //x축
  const labels = ['노래벙', '친목벙', '운동벙 ', '버스킹', '이벤트벙']

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `이번달 ${dateCalc('flatMonth')}월 개설된 벙의 종류`
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: '열린 횟수',
        data: totality,
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(104, 104, 104, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
          '#8b8b8b',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Pie options={options} data={data} />
    </GraphAttendContainer>
  )
}

export default MeetingType