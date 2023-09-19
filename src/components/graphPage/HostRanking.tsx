import type { Member, Meet } from "../../store/slice.ts"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { useState } from "react";
import React from 'react';
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
import { dateCalc } from '../common/dateCalc.ts';
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
interface Props {
  meetData: Meet[]
  yearView: number
  setYearView: React.Dispatch<React.SetStateAction<number>>
}


const HostRanking = ({meetData, yearView, setYearView} : Props) => {

  const [ nowMonthNumber, setNowMonthNumber ] = useState(Number(dateCalc('flatMonth')))

  let handleData: Record<string, number> = {}
  meetData[nowMonthNumber-1]?.[1].forEach(val => {
    if(val.type !== '운영진회의' && val.type !== '정모'){
      handleData[val.host] = (handleData[val.host] || 0) + 1
    }
  })

  let handleData2 = Object.entries(handleData).sort((a, b) => {
    return b[1] - a[1]
  })

  const labels = handleData2.map(val => val[0])
  const yLabels = handleData2.map(val => val[1])
  const yMax = Math.max(...yLabels)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `${nowMonthNumber}월 벙 개설 횟수`
      },
    },
    scales: {
      y: {
        min: 0,
        max: yMax > 3 ? yMax : 3,
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
        label: '벙 개설 횟수',
        data: yLabels,
        backgroundColor: [
          'rgba(255, 92, 86, 0.8)',
          'rgba(235, 90, 54, 0.8)',
          'rgba(255, 150, 102, 0.8)',
          'rgba(255, 99, 208, 0.8)',
          'rgba(236, 130, 43, 0.8)',
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
    <>
    <GraphAttendContainer>
      <Bar options={options} data={data} />
      <p className="sub_title">* 정모 및 운영진회의 제외</p>
      <div className="arrow_container">
        <BsArrowLeftCircle onClick={() => {
          if (nowMonthNumber > 1) {
            setNowMonthNumber(nowMonthNumber - 1)
          }
        }} />
        <BsArrowRightCircle onClick={() => {
          if (nowMonthNumber < Number(dateCalc('flatMonth'))) {
            setNowMonthNumber(nowMonthNumber + 1)
          }
        }}/>
      </div>
    </GraphAttendContainer>
    </>
  )
}

export default HostRanking