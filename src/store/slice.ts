import { createSlice } from "@reduxjs/toolkit"
import { dateCalc } from "../components/dateCalc"

export interface Member {
  id?: string
  name: string
  join: string
  year: string
  gender: string
  etc: string
  state?: boolean
  target?: string
  pay?: boolean
  special?: string
  total?: number
  totalHost?: number
  [key: `${number}month`]: number
  [key: `${number}monthHost`]: number
}

//state 초기 값
interface InitialState {
  membersData: [string, Member][]
  sendMember: Member
  modalState: boolean
  modalPartState: boolean
  sortDirection : {
    name: number
    join: number
    year: number
    etc: number
    yearPart: number
    monthPart: number
    yearHost: number
  }
  loginUser: {
    uid: string
    name: string
    photoURL: string
    level: number
    state: boolean
  }
}

const initialState: InitialState = {
  membersData: [],
  sendMember: {
    id: '',
    name: '',
    join: '',
    year: '',
    gender:'',
    state: false,
    etc: '',
    special: ''
  },
  modalState: false,
  modalPartState: false,
  sortDirection : {
    name: 1,
    join: 1,
    year: 1,
    etc: 1,
    yearPart: 1,
    monthPart: 1,
    yearHost: 1
  },
  loginUser: {
    uid: '',
    name: '',
    photoURL: '',
    level: 1,
    state: false
  },
}

//reducer, state를 모두 관리할 slice
const membersDataSlice = createSlice({
  name: "membersData",
  initialState,
  reducers: {

    //데이터 세팅
    setMembers (state, action) {
      state.membersData = action.payload
    },

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
            yearHost: 1
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
          let string = `${dateCalc('flatMonth')}month`
          let aPart = (a[1] as any)[string] || 0
          let bPart = (b[1] as any)[string] || 0
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

      } 
      
    },

    //모달 
    toggleModal (state) {state.modalState = !state.modalState},
    togglePartModal (state) {state.modalPartState = !state.modalPartState},

    //모달 전송
    sendMember (state, action) {state.sendMember = action.payload},

    //로그인 유저 전송
    loginUserSend (state, action) {state.loginUser = action.payload},
  }
})
export const { sortState, toggleModal, togglePartModal, sendMember, setMembers, loginUserSend } = membersDataSlice.actions
export default membersDataSlice.reducer