import type { MeetData, Schedule } from "../../store/slice.ts"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
import { Radar } from 'react-chartjs-2';
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
interface Props {
  meetData: MeetData
  yearView: number
}


const Week = ({meetData, yearView} : Props) => {
  //x축 (월)
  const labels = ['일', '월', '화', '수', '목', '금', '토']
  console.log(meetData)
  //y축 (개설횟수)
  const yLabels = [0,0,0,0,0,0,0]
  let testData = meetData.find(val => Number(val[0]) === yearView)

  //타입 가드 함수 (멍청한 타입스크립트에게 타입을 정확히 알려주자)
  const isScheduleArray = (value: any): value is Schedule[] => {
    return Array.isArray(value);
  }

  if(testData){
    testData[1].forEach(month => {
      if(isScheduleArray(month)){
        month?.forEach(target => {
          const formatted = target.date
          .replace('년 ', '/').replace('월 ', '/').split('일')[0]
    
          const date = new Date(formatted)
          yLabels[date.getDay()]++
        })
      }
    })
  }


  const options: any = {
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${yearView}년 전체 요일별 벙 개설횟수 통계`
      },
    },
    scales: {
      r: {
        min: 0,
        angleLines: {
          display: true,
        },
        pointLabels: {
          callback: function(label: string) {
            return label + '요일'
          }
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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Radar options={options} data={data} />
    </GraphAttendContainer>
  )
}

export default Week