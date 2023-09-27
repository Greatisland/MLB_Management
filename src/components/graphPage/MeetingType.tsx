import type { MeetData } from "../../store/slice.ts"
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
import { GraphAttendContainer } from "../../style/graphPageStyled.tsx";
import { useAppSelector } from "../../store/hook.ts";
interface Props {
  meetData: MeetData
}

const MeetingType = ({meetData} : Props) => {
  const { yearView, monthView } = useAppSelector(state => state.membersData)
  //x축
  const labels = ['노래벙', '친목벙', '운동벙 ', '버스킹', '이벤트벙', '정모', '운영진회의', '기타']

  //비동기 오류때문에 삼항연산자로 값 가져옴
  let testData = meetData.find(val => Number(val[0]) === yearView)
  let nowMonthData = (testData ? (testData[1][monthView] ? testData[1][monthView] : []) : []) as any[]
  //y축
  let total = new Array(labels.length).fill(0)

  //y축 데이터 바인딩
  nowMonthData.forEach(val => {
    switch(val.type){
      case '노래벙' : total[0]++
      break
      case '친목벙' : total[1]++
      break
      case '운동벙' : total[2]++
      break
      case '버스킹' : total[3]++
      break
      case '이벤트벙' : total[4]++
      break
      case '정모' : total[5]++
      break
      case '운영진회의' : total[6]++
      break
      default : total[5]++
    }
  })
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${yearView}년 ${monthView}월 열린 벙의 종류`
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        label: '열린 횟수',
        data: total,
        backgroundColor: [
          'rgba(235, 196, 66, 0.2)',  // 밝은 주황색
          'rgba(34, 142, 215, 0.2)',  // 밝은 파란색
          'rgba(143, 92, 245, 0.2)',  // 밝은 자주색
          'rgba(235, 39, 39, 0.2)',   // 밝은 빨간색
          'rgba(108, 108, 108, 0.2)', // 중간 회색
          'rgba(0, 235, 107, 0.2)',   // 밝은 녹색
          'rgba(0, 206, 209, 0.2)',   // 밝은 청록색
          'rgba(155, 9, 65, 0.2) 9, 136, 0.784)'   // 보라색
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',    // 밝은 주황색
          'rgba(54, 162, 235, 1)',   // 밝은 파란색
          'rgba(153, 102, 255, 1)',  // 밝은 자주색
          'rgba(255, 59, 59, 1)',    // 밝은 빨간색
          'rgba(128, 128, 128, 1)',  // 중간 회색
          'rgba(0, 255, 127, 1)',    // 밝은 녹색
          'rgba(11, 231, 235, 1)',   // 밝은 청록색
          '#eb8ce3'    // 보라색
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <GraphAttendContainer>
      <Pie options={options} data={data} />
      {Math.max(...total) === 0 ? <>
        <p className="empty_sub">{yearView}년 {monthView}월은 데이터가 없어요😬</p>
      </> : null}
    </GraphAttendContainer>
  )
}

export default MeetingType