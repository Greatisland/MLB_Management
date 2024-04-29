import { createSlice } from "@reduxjs/toolkit"
import { totalCalcFunc } from "../lib/totalCalcFunc"
import type { InitialState } from "./type"
import { getTotalAttendance } from "../lib/getTotalAttendance"


const initialState: InitialState = {
  membersData: [],
  meetData: [],
  banData: [],
  hofData: [],
  sendBusking: {
    id: '',
    title: '',
    content: '',
    date: '',
    participants: [],
    location: '',
    deadline: '',
    max: ''
  },
  sendMember: {
    id: '',
    name: '',
    join: '',
    year: '',
    birth: '',
    gender:'',
    state: false,
    etc: '',
    special: '',
    break: false,
    comeback: '',
    awardCount: {}
  },
  sendBan: {
    id: '',
    name: '',
    date: '',
    content: '',
    state: false
  },
  modalState: false,
  modalPartState: false,
  modalBuskingState: false,
  sortDirection : {
    name: 1,
    join: 1,
    year: 1,
    etc: 1,
    yearPart: 1,
    monthPart: 1,
    yearHost: 1,
    aver: 1
  },
  loginUser: {
    uid: '',
    name: '',
    photoURL: '',
    level: 1,
    email: '',
    state: false
  },
  accountList: [],
  fee: {
    gold: 0
  },
  isSwiping: true,
  yearView: new Date().getFullYear(),
  monthView: new Date().getMonth() + 1,
}

//reducer, state를 모두 관리할 slice
const membersDataSlice = createSlice({
  name: "membersData",
  initialState,
  reducers: {

    //날짜 보기
    setYearView(state, action) {state.yearView = action.payload},
    setMonthView(state, action) {state.monthView = action.payload},

    //데이터 세팅
    setMembers (state, action) {state.membersData = action.payload},
    setBanMembers (state, action) {state.banData = action.payload},
    setHof (state, action) {state.hofData = action.payload},
    setAccountList (state, action) {state.accountList = action.payload},
    setFee (state, action) {state.fee = action.payload},
    setMeet (state, action) {state.meetData = action.payload},

    //멤버 정렬
    sortState (state, action) {
      // 정렬 방향을 추적하는 객체 초기화
      if (!state.sortDirection) {
        state.sortDirection = {
            name: 1,
            join: 1,
            year: 1,
            etc: 1,
            yearPart: 1,
            monthPart: 1,
            yearHost: 1,
            aver: 1
        }
      }
  
      // 정렬 기준에 따라 처리
      if (action.payload === 'name') {
        state.membersData.sort((a, b) => {
          let aName = a[1].name
          let bName = b[1].name
          let comparison = aName < bName ? -1 : (aName > bName ? 1 : 0)
          return comparison * state.sortDirection.name; // 방향에 따른 정렬
        })
        state.sortDirection.name = -state.sortDirection.name; // 방향 전환

      } else if (action.payload === 'join') {
        state.membersData.sort((a, b) => {
          return (new Date(a[1].join).getTime() - new Date(b[1].join).getTime()) * state.sortDirection.join
        })
        state.sortDirection.join = -state.sortDirection.join // 방향 전환
  
      } else if (action.payload === 'year') {
        state.membersData.sort((a, b) => {
          return (Number(a[1].year) - Number(b[1].year)) * state.sortDirection.year
        })
        state.sortDirection.year = -state.sortDirection.year // 방향 전환
  
      } else if (action.payload === 'etc') {
        state.membersData.sort((a, b) => {
          let aName = a[1].etc || ''
          let bName = b[1].etc || ''
          let comparison = aName < bName ? 1 : (aName > bName ? -1 : 0)
          return comparison * state.sortDirection.etc // 방향에 따른 정렬
        })
        state.sortDirection.etc = -state.sortDirection.etc // 방향 전환

      } else if (action.payload === 'yearPart') {
        state.membersData.sort((a, b) => {
          let aPart = a[1].total || 0
          let bPart = b[1].total || 0
          return (Number(bPart) - Number(aPart)) * state.sortDirection.yearPart
        })
        state.sortDirection.yearPart = -state.sortDirection.yearPart // 방향 전환

      } else if (action.payload === 'monthPart') {
        state.membersData.sort((a, b) => {
          let aPart = (a[1] as any).attend?.[state.yearView]?.[state.monthView] || 0
          let bPart = (b[1] as any).attend?.[state.yearView]?.[state.monthView] || 0
          return (Number(bPart) - Number(aPart)) * state.sortDirection.monthPart
        })
        state.sortDirection.monthPart = -state.sortDirection.monthPart // 방향 전환
      } else if (action.payload === 'yearHost') {
        state.membersData.sort((a, b) => {
          let aPart = a[1].totalHost || 0
          let bPart = b[1].totalHost || 0
          return (Number(bPart) - Number(aPart)) * state.sortDirection.yearHost
        })
        state.sortDirection.yearHost = -state.sortDirection.yearHost // 방향 전환
      } else if (action.payload === 'aver') {
        /* //전체 평균값일 경우
        state.membersData.sort((a, b) => {
          return (totalCalcFunc(b[1], state.yearView).aver - totalCalcFunc(a[1], state.yearView).aver) * state.sortDirection.aver
          // return (averCheck(b[1], state.yearView) - averCheck(a[1], state.yearView)) * state.sortDirection.aver
        })
        state.sortDirection.aver = -state.sortDirection.aver
        */
       state.membersData.sort((a, b) => {
        return (
          (getTotalAttendance(b[1]) - getTotalAttendance(a[1])) * state.sortDirection.aver
        )
       })
       state.sortDirection.aver = -state.sortDirection.aver
      }
    },

    //모달 
    toggleModal (state) {
      state.modalState = !state.modalState
      if(state.modalState){document.body.classList.add('no-scroll')}
      else{document.body.classList.remove('no-scroll')}
    },
    togglePartModal (state) {
      state.modalPartState = !state.modalPartState
      if(state.modalPartState){document.body.classList.add('no-scroll')}
      else{document.body.classList.remove('no-scroll')}
    },
    toggleBuskingModal (state) {
      state.modalBuskingState = !state.modalBuskingState
      if(state.modalBuskingState){document.body.classList.add('no-scroll')}
      else{document.body.classList.remove('no-scroll')}
    },

    //모달 전송
    sendMember (state, action) {state.sendMember = action.payload},
    sendBan (state, action) {state.sendBan = action.payload},
    sendBusking (state, action) {state.sendBusking = action.payload},

    //로그인 유저 전송
    loginUserSend (state, action) {state.loginUser = action.payload},

    //슬라이드 이벤트 비활성
    stopSwiping (state) {state.isSwiping = false},
    startSwiping (state) {state.isSwiping = true},
  }
})
export const { 
  setYearView,
  setMonthView,
  stopSwiping, 
  startSwiping, 
  sortState, 
  toggleModal, 
  togglePartModal, 
  toggleBuskingModal,
  setFee, 
  sendMember, 
  setBanMembers, 
  setMembers, 
  sendBusking,
  setMeet,
  setHof, 
  sendBan, 
  loginUserSend, 
  setAccountList
} = membersDataSlice.actions
export default membersDataSlice.reducer