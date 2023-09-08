import type { Meet } from "../../store/slice"
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
import { dateCalc } from '../common/dateCalc';
import { GraphAttendContainer } from "../../style/graphPageStyled";
interface Props {
  meet: Meet[]
}


const Week = ({meet} : Props) => {
  //x축 (월)
  const labels = ['일', '월', '화', '수', '목', '금', '토']

  //y축 (개설횟수)
  const yLabels = [0,0,0,0,0,0,0]
  meet.forEach(month => {
    month[1]?.forEach(target => {
      const formatted = target.date
      .replace('년 ', '-').replace('월 ', '-').split('일')[0]

      const date = new Date(formatted)
      yLabels[date.getDay()]++
    })
  })

  const options: any = {
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${dateCalc('year')}년 전체 요일별 벙 통계`
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