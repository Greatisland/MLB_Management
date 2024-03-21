import type { MeetData } from "../../store/type.ts"
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
import { Bar } from 'react-chartjs-2';
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
import { useAppSelector } from "../../store/hook.ts";

interface Props {
  meetData: MeetData
}


const YearOverview = ({meetData} : Props) => {
  const { yearView } = useAppSelector(state => state.membersData)
  let testData = meetData.find(val => Number(val[0]) === yearView)

  //x축
  let labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

  //y축
  let totalParticipants: number[] = []

  if(testData){
    if(Array.isArray(testData[1])){
      for(let i = 0; i < testData[1].length; i++){
        const monthData = testData[1][i]
        if(i >= 1 && 12 >= i){
          if(monthData){
            if(Array.isArray(monthData)){
              // 총 참가자 계산
              const total = monthData.reduce((acc, val) => {
                const joinMember = val.list ? val.list.split(',').length : 0
                return acc + joinMember
              }, 0)
              totalParticipants.push(total)
            }else if(monthData && monthData.list){
              const total = monthData.list.split(',').length
              totalParticipants.push(total ? total : 0)
            }
          }else{
            totalParticipants.push(0)
          }
        }
      }
    }
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${yearView}년 참석 월별 누적총합`
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...totalParticipants, 200),
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
        label: '참가자 총합',
        data: totalParticipants,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: [
          // 'rgba(255, 92, 86, 0.8)',
          // 'rgba(235, 90, 54, 0.8)',
          // 'rgba(255, 150, 102, 0.8)',
          // 'rgba(255, 99, 208, 0.8)',
          // 'rgba(236, 130, 43, 0.8)',
          // 'rgba(64, 255, 223, 0.8)',
          // 'rgba(75, 192, 192, 0.8)', // 편안한 민트
          // 'rgba(255, 159, 64, 0.8)',  // 주황색
          'rgba(205, 85, 85, 0.8)',   // 로즈
          // 'rgba(132, 112, 255, 0.8)'  // 라이트 퍼플
        ],
      },
    ],
  };
  return (
    <>
    <GraphAttendContainer>
      <Bar options={options} data={data} />
      {totalParticipants.length === 0 ? <>
        <p className="empty_sub">{yearView}년은 데이터가 없어요😬</p>
      </> : null}
      {/* <p className="sub_title">* 정모 및 운영진회의 제외</p> */}
    </GraphAttendContainer>
    </>
  )
}

export default YearOverview