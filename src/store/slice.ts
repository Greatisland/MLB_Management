import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { NotionApi } from "../api/NotionApi"
import { dateCalc } from "../components/dateCalc"

//비동기 실행 thunk
export const getMembersData = createAsyncThunk("members/getMembersData", async () => {
  return NotionApi.readData()
})

//state 초기 값
interface InitialState {
  membersData: Member[]
  payMemberData: Member[]
  noPayMemberData: Member[]
  modalState: boolean
  sendMember: {
    id: string
    archived: boolean
    name: string
    join?: string
    year?: string
    etc?: string
    gender: string
    state: false
  }
}

export interface Member {
  id: string
  archived: boolean
  properties: {
    이름: {
      title: {
        plain_text: string
      }[]
    }
    가입일: {
      date: {
        start: string
      }
    }
    년생: {
      rich_text: {
        plain_text: string
      }[]
    }
    비고: {
      rich_text: {
        plain_text?: string
      }[]
    }
    성별: {
      rich_text: {
        plain_text: string
      }[]
    }
    회비대상: {
      rich_text: {
        plain_text: string
      }[]
    }
    납부체크: {
      checkbox: boolean
    }
    운영진: {
      checkbox: boolean
    }
  }
}

const initialState: InitialState = {
  membersData: [],
  payMemberData: [],
  noPayMemberData: [],
  modalState: false,
  sendMember: {
    id: '',
    archived: false,
    name: '',
    join: '',
    year: '',
    etc: '',
    gender: '',
    state: false
  }
}

//reducer, state를 모두 관리할 slice
const membersDataSlice = createSlice({
  name: "membersData",
  initialState,
  reducers: {

    //memeberUpdate, memberDelete는 api호출을 최소화하기 위한 메소드
    memberUpdate (state, action) {
      let index = state.membersData.findIndex(member => member.id === action.payload.id)
      if(index !== -1){state.membersData.splice(index, 1, action.payload)}
      else{
        state.membersData = [...state.membersData, action.payload]
      }
    },

    //멤버 제거
    memberDelete (state, action) {
      let index = state.membersData.findIndex(member => member.id === action.payload.id)
      state.membersData.splice(index, 1)
    },

    //멤버 정렬
    sortState (state, action){
      if(action.payload === 'name'){
        state.membersData.sort((a, b) => {
          let aName = a.properties.이름.title[0].plain_text
          let bName = b.properties.이름.title[0].plain_text
          if (aName < bName) {
            return -1
          }
          if (aName > bName) {
            return 1
          }
          return 0;
        })

      }else if(action.payload === 'join'){
        state.membersData.sort((a, b) => new Date(a.properties.가입일.date.start).getTime() - new Date(b.properties.가입일.date.start).getTime())

      }else if(action.payload === 'year'){
        state.membersData.sort((a, b) => {
          return Number(a.properties.년생.rich_text[0].plain_text) - Number(b.properties.년생.rich_text[0].plain_text)
        })
      }else if(action.payload === 'etc'){
        state.membersData.sort((a, b) => {
          let aName = a.properties.비고.rich_text[0] ? a.properties.비고.rich_text[0].plain_text as string : ''
          let bName = b.properties.비고.rich_text[0] ? b.properties.비고.rich_text[0].plain_text as string : ''
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

    //납부멤버 <-> 면제멤버 토글
    payMemberToggle (state, action) {
      let updatePay = [...state.payMemberData]
      let updateNoPay = [...state.noPayMemberData]

      if(!action.payload.add){

        let index = updatePay.findIndex(member => member.id === action.payload.id)
        updatePay.splice(index, 1)
        updateNoPay.push(action.payload.member)

        NotionApi.updatePay(action.payload.member.id, '기타')

      }else{

        let index = updateNoPay.findIndex(member => member.id === action.payload.id)
        updateNoPay.splice(index, 1)
        updatePay.push(action.payload.member)

        NotionApi.updatePay(action.payload.member.id, '')

      }
      
      state.payMemberData = updatePay
      state.noPayMemberData = updateNoPay
    },

    //납부 <-> 미납 토글
    payCheckToggle (state, action) {
      let index = state.payMemberData.findIndex(member => member.id === action.payload.id)
      state.payMemberData[index].properties.납부체크.checkbox = !state.payMemberData[index].properties.납부체크.checkbox

      NotionApi.updateCheck(action.payload.id, !state.payMemberData[index].properties.납부체크.checkbox)
    },

    //전원 납부 <-> 미납 토글
    payAllToggle (state, action) {

      state.membersData.forEach(member => {
        NotionApi.updateCheck(member.id, action.payload)
      })

      state.payMemberData = state.payMemberData.map(member => member.properties.납부체크.checkbox = action.payload)
      state.noPayMemberData = state.noPayMemberData.map(member => member.properties.납부체크.checkbox = action.payload)
    }
    
  },
  extraReducers (builder) {
    builder
    .addCase(getMembersData.pending, () => {
      //fetch되기 전 수행할 action 작성
      console.log('로딩중..')
    })

    .addCase(getMembersData.fulfilled, (state, action) => {
      //fetch성공 후 수행할 action 작성
      state.membersData = action.payload

      let todayYear = dateCalc('year')
      let todayMonth = dateCalc('month')

      state.payMemberData = action.payload.filter(member => {
        let date = new Date(member.properties.가입일.date.start)
        let joinYear = String(date.getFullYear())
        let joinMonth = String(date.getMonth() + 1).padStart(2,'0')

        if(
          todayYear === joinYear &&
          todayMonth === joinMonth
        ){
          if(member.properties.회비대상.rich_text.length !== 0){
            member.properties.회비대상.rich_text[0].plain_text = '신입'
          }else{
            member.properties.회비대상.rich_text.push({plain_text: '신입'})
          }
          state.noPayMemberData.push(member)
        }else if(
          member.properties.운영진.checkbox
        ){
          if(member.properties.회비대상.rich_text.length !== 0){
            member.properties.회비대상.rich_text[0].plain_text = '운영진'
          }else{
            member.properties.회비대상.rich_text.push({plain_text: '운영진'})
          }
          state.noPayMemberData.push(member)
        }else if(
          member.properties.회비대상.rich_text.length === 0
        ){
          return member
        }
      })
    })

    .addCase(getMembersData.rejected, () => {
      //fetch 실패 시 수행할 action 작성
      console.log('fetch 실패 ㅠㅠ')
    })
  },
})
export const { sortState, toggleModal, sendMember, memberUpdate, memberDelete, payMemberToggle, payCheckToggle, payAllToggle } = membersDataSlice.actions
export default membersDataSlice.reducer