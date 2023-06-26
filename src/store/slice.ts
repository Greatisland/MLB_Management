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
    sortState (state, action){
      if(action.payload === 'name'){
        state.membersData.sort((a, b) => {
          let aName = a[1].name
          let bName = b[1].name
          if (aName < bName) {
            return -1
          }
          if (aName > bName) {
            return 1
          }
          return 0;
        })

      }else if(action.payload === 'join'){
        state.membersData.sort((a, b) => new Date(a[1].join).getTime() - new Date(b[1].join).getTime())

      }else if(action.payload === 'year'){
        state.membersData.sort((a, b) => {
          return Number(a[1].year) - Number(b[1].year)
        })
      }else if(action.payload === 'etc'){
        state.membersData.sort((a, b) => {
          let aName = a[1].etc || ''
          let bName = b[1].etc || ''
          if (aName < bName) {
            return 1
          }
          if (aName > bName) {
            return -1
          }
          return 0;
        })
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