import type { Member } from "../store/slice"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';
import { dateCalc } from './dateCalc';
import { GraphAttendContainer } from "../style/graphPageStyled";
interface Props {
  members: [string, Member][]
}


const GraphPersonal = ({members} : Props) => {
  const totalMembers = members.filter(member => !member[1].break)

  //총 인원
  let totality = [40, 42, 45, 42 ,42 ,47, totalMembers.length] 
//이년 39
//1월 추가 +2 + 8 이탈 -4
//2월 추가 +3 + 1 이탈 -2
//3월 추가 +4 + 4 이탈 - 5
//4월 추가 +3 이탈 -6
//5월 추가 +4 이탈 -4
//6월 추가 +7 이탈 - 2
  //참석 인원
  let personal = []

  //참석 인원 계산
  for (let i = 1; i <= Number(dateCalc('flatMonth')); i++) {
    const result = totalMembers.reduce((acc: number, member) => {
      const targetValue = member[1][`${i}month` as any]
      if (targetValue) {
        acc++
      }
      return acc
    }, 0)

    personal.push(result || 0)
  }

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
        text: `총 인원 대비 참석한 사람 수`
      },
    },
    scales: {
      y: {
        min: 0,
        max: 60,
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
        label: '총 인원',
        data: totality,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '참석한 사람 수',
        data: personal,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Line options={options} data={data} />
      <p>매달 모임의 전체 인원 숫자와 참석한 멤버의 숫자를 확인합니다.</p>
    </GraphAttendContainer>
  )
}

export default GraphPersonal