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

  //총 인원
  let totality = [50, 50, 50, 50 ,50 ,50, 50  ]
  //참석 인원
  let personal = []

  //계산
  for (let i = 1; i <= Number(dateCalc('flatMonth')); i++) {
    const result = members.reduce((acc: [number, number], member) => {
      const targetValue = member[1][`${i}month` as any]
      if (targetValue) {
        acc[0] += Number(targetValue)
        acc[1]++
      }
      return acc
    }, [0, 0])

    totality.push(result[0] || 0)
    personal.push(result[1] || 0)
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