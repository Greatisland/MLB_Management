import { createSlice } from "@reduxjs/toolkit"

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
}

//state 초기 값
interface InitialState {
  membersData: [string, Member][]
  sendMember: Member
  modalState: boolean
  sortDirection : {
    name: number
    join: number
    year: number
    etc: number
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
  sortDirection : {
    name: 1,
    join: 1,
    year: 1,
    etc: 1
  }
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
            etc: 1
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
          return (Number(a[1].year) - Number(b[1].year)) * state.sortDirection.year;
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
      }
    },

    //모달 
    toggleModal (state) {state.modalState = !state.modalState},

    //모달 전송
    sendMember (state, action) {state.sendMember = action.payload},
  }
})
export const { sortState, toggleModal, sendMember, setMembers} = membersDataSlice.actions
export default membersDataSlice.reducer