import type { MeetData } from "../../store/slice.ts"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from 'react-chartjs-2';
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
import { useAppSelector } from "../../store/hook.ts";

interface Props {
  meetData: MeetData
}

const AveragePart = ({meetData} : Props) => {
  const { yearView } = useAppSelector(state => state.membersData)
  let testData = meetData.find(val => Number(val[0]) === yearView)


  //x축
  let labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  //y축
  let averageParticipants: number[] = []
  let bungs: number[] = []

  if(testData){
    if(Array.isArray(testData[1])){
      for(let i = 0; i < testData[1].length; i++){
        const monthData = testData[1][i]
        if(i >= 1 && 12 >= i){
          if(monthData){
            if(Array.isArray(monthData)){
              // 평균 참가자 계산
              const total = monthData.reduce((acc, val) => {
                const joinMember = val.list ? val.list.split(',').length : 0
                return acc + joinMember
              }, 0)
              const aver = total / monthData.length
              averageParticipants.push(aver)
              bungs.push(monthData.length)
            }else if(monthData && monthData.list){
              const total = monthData.list.split(',').length
              averageParticipants.push(total ? total : 0)
              bungs.push(1)
            }
          }else{
            averageParticipants.push(0)
            bungs.push(0)
          }
        }
      }
    }else{
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `${yearView}년 벙 통계`
      },
    },
    scales: {
      y: {
        min: 0,
        // max: 30,
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
        label: '참석인원 평균',
        data: averageParticipants,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '벙 갯수',
        data: bungs,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <>
    <GraphAttendContainer>
      <Line options={options} data={data} />
      {averageParticipants.length === 0 && bungs.length === 0 ? <>
        <p className="empty_sub">{yearView}년은 데이터가 없어요😬</p>
      </> : null}
      {/* <p className="sub_title">* 정모 및 운영진회의 제외</p> */}
    </GraphAttendContainer>
    </>
  )
}

export default AveragePart