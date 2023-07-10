// import type { Member } from "../store/slice"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );
// import { Bar } from 'react-chartjs-2';
// import { dateCalc } from './dateCalc';
// import { GraphAttendContainer } from "../style/graphPageStyled";
// interface Props {
//   members: [string, Member][]
// }


// const GraphMeeting = ({members} : Props) => {

//   //벙 숫자
//   let meeting = []

//   //계산
//   for (let i = 1; i <= Number(dateCalc('flatMonth')); i++) {
//     const result = members.reduce((acc: [number, number], member) => {
//       const targetValue = member[1][`${i}month` as any]
//       if (targetValue) {
//         acc[0] += Number(targetValue)
//         acc[1]++
//       }
//       return acc
//     }, [0, 0])

//     meeting.push(result[0] || 0)
//   }

//   //x축
//   const basicLabels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
//   const labels = basicLabels.slice(0, Number(dateCalc('flatMonth')))
  
  

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: `총 참석 횟수`
//       },
//     },
//     scales: {
//       y: {
//         min: 0,
//         ticks: {
//           beginAtZero: true,
//           stepSize: 1,
//           precision: 0
//         }
//       }
//     }
//   }

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: '총 참석횟수',
//         data: totality,
//         backgroundColor: 'rgb(255, 99, 132)',
//       },
//       // {
//       //   label: '참가한 사람 수',
//       //   data: personal,
//       //   backgroundColor: 'rgb(53, 162, 235)',
//       // },
//     ],
//   };
//   return (
//     <GraphAttendContainer>
//       <Bar options={options} data={data} />
//     </GraphAttendContainer>
//   )
// }

// export default GraphMeeting