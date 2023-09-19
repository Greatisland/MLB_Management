import React, { useState } from 'react';
import type { MeetData } from "../../store/slice.ts"
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
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
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
interface Props {
  meetData: MeetData
  yearView: number
  setYearView: React.Dispatch<React.SetStateAction<number>>
  monthView: number
  setMonthView: React.Dispatch<React.SetStateAction<number>>
}


const HostRanking = ({meetData, yearView, setYearView, monthView, setMonthView} : Props) => {

  let handleData: Record<string, number> = {}

  let testData = meetData.find(val => Number(val[0]) === yearView)
  let nowMonthData = (testData ? (testData[1][monthView] ? testData[1][monthView] : []) : []) as any[]

  nowMonthData.forEach(val => {
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
        text: `${monthView}월 벙 개설 횟수`
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
          if (monthView > 1) {
            setMonthView(monthView - 1)
          }else if(monthView === 1){
            if(yearView > 2017) {
              setYearView(yearView - 1)
              setMonthView(12)
            }
          }
        }} />
        <BsArrowRightCircle onClick={() => {
          if (monthView < 12) {
            setMonthView(monthView + 1)
          }else if(monthView === 12){
            if(yearView < new Date().getFullYear()) {
              setYearView(yearView + 1)
              setMonthView(1)
            }
          }
        }}/>
      </div>
    </GraphAttendContainer>
    </>
  )
}

export default HostRanking