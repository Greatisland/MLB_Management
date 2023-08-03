import { createSlice } from "@reduxjs/toolkit"
import { dateCalc } from "../components/common/dateCalc"
import { averCheck } from "../components/common/averCheck"

export interface Member {
  id?: string
  name: string
  join: string
  comeback?: string
  year: string
  gender: string
  etc: string
  state?: boolean
  uid?: string
  target?: string
  pay?: boolean
  special?: string
  total?: number
  totalHost?: number
  break?: boolean
  danger?: boolean
  [key: `${number}month`]: number
  [key: `${number}monthHost`]: number
}

export interface Ban {
  id?: string
  name: string
  date: string
  content: string
  state?: boolean
}

export interface Hof {
  eventName: string
  eventDate: string
  fClass: string
  fTrack: string
  imgUrl: string
  imgUrl2?: string
  imgUrl3?: string
  imgUrl4?: string
  sAward?: string
  sClass?: string
  sTrack?: string
  tAward?: string
  tClass?: string
  tTrack?: string
  anotherAward?: string
  anotherClass?: string
  anotherTrack?: string
  fLink?: string
  sLink?: string
  tLink?: string
  anotherLink?: string
  fLink2?: string
  sLink2?: string
  tLink2?: string
  anotherLink2?: string
}

export interface Board {
  title: string
  content: string
  date: string
  secret: boolean
  uid: string
  viewCount?: number
  viewUsers?: string[]
  comments: {
    nickName: string
    contents: string
    date: string
    uid: string
  }[]
}

interface Account {
  name: string
  level: number
}

//state 초기 값
interface InitialState {
  membersData: [string, Member][]
  banData: [string, Ban][]
  hofData: [string, Hof][]
  sendMember: Member
  sendBan: Ban
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
    aver: number
  }
  loginUser: {
    uid: string
    name: string
    photoURL: string
    level: number
    state: boolean
    email: string
  }
  accountList : [string, Account][]
}

const initialState: InitialState = {
  membersData: [],
  banData: [],
  hofData: [],
  sendMember: {
    id: '',
    name: '',
    join: '',
    year: '',
    gender:'',
    state: false,
    etc: '',
    special: '',
    break: false,
    comeback: ''
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
  accountList: []
}

//reducer, state를 모두 관리할 slice
const membersDataSlice = createSlice({
  name: "membersData",
  initialState,
  reducers: {

    //데이터 세팅
    setMembers (state, action) {state.membersData = action.payload},
    setBanMembers (state, action) {state.banData = action.payload},
    setHof (state, action) {state.hofData = action.payload},
    setAccountList (state, action) {state.accountList = action.payload},

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
      } else if (action.payload === 'aver') {
        state.membersData.sort((a, b) => {
          return (averCheck(b[1]) - averCheck(a[1])) * state.sortDirection.aver
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

    //모달 전송
    sendMember (state, action) {state.sendMember = action.payload},
    sendBan (state, action) {state.sendBan = action.payload},

    //로그인 유저 전송
    loginUserSend (state, action) {state.loginUser = action.payload},

  }
})
export const { sortState, toggleModal, togglePartModal, sendMember, setBanMembers, setMembers, setHof, sendBan, loginUserSend, setAccountList } = membersDataSlice.actions
export default membersDataSlice.reducer