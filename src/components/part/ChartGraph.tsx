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
import { dateCalc } from '../common/dateCalc.ts';
import type { Member } from '../../store/slice.ts';

const ChartGraph = ({ member, aver }: { member: Member, aver: number }) => {

  //참여횟수
  let part = []
  //개설횟수
  let open = []
  //평균
  let averList = new Array(12).fill(aver)


  //계산
  for (let i = 1; i <= Number(dateCalc('flatMonth')); i++) {
    const monthValue = member[`${i}month` as keyof Member]
    const monthHostValue = member[`${i}monthHost` as keyof Member]
    
    part.push(monthValue ? Number(monthValue) : 0)
    open.push(monthHostValue ? Number(monthHostValue) : 0)
  }
  
  const date = new Date()
  const joinDate = new Date(member.join)
  const joinYear = joinDate.getFullYear()
  const joinMonth = joinDate.getMonth() + 1

  //그래프를 시작할 달
  let monthStart = 0

  //가입달부터 그래프 시작
  if(date.getFullYear() === joinYear){
    monthStart = joinMonth - 1
    part = part.slice(monthStart)
    open = open.slice(monthStart)
  }

  //x축
  const basicLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
  const labels = basicLabels.slice(monthStart, Number(dateCalc('flatMonth')))
  
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '벙 참석 & 벙 개설 그래프',
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
        label: '벙 참석',
        data: part,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '벙 개설',
        data: open,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: '평균 참석율',
        data: averList,
        borderColor: 'rgb(255, 99, 132, 0.1)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
      },
    ],
  };
  return (
    <div className='chartWrap'>
      <Line options={options} data={data} />
    </div>
  )
}

export default ChartGraph