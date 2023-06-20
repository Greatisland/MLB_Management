import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { NotionApi } from "../api/NotionApi"

//비동기 실행 thunk
export const getMembersData = createAsyncThunk("members/getMembersData", async () => {
  return NotionApi.readData()
})

//state 초기 값
interface InitialState {
  membersData: Member[]
  modalState: boolean
  sendMember: {
    id: string
    archived: boolean
    name: string
    join?: string
    year?: string
    etc?: string
    state: false
  }
}

interface Member {
  id: string
  archived: boolean
  properties: Properties
}

interface Properties {
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
}

const initialState: InitialState = {
  membersData: [],
  modalState: false,
  sendMember: {
    id: '',
    archived: false,
    name: '',
    join: '',
    year: '',
    etc: '',
    state: false
  }
}

//reducer, state를 모두 관리할 slice
const membersDataSlice = createSlice({
  name: "membersData",
  initialState,
  reducers: {
    sortState: (state, action) => {
      console.log(action.payload)
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

      }else if(action.payload === 'birth'){
        state.membersData.sort((a, b) => {
          if(a.properties.년생.rich_text[0].plain_text === '00'){
            a.properties.년생.rich_text[0].plain_text = '2000'
          }else if(b.properties.년생.rich_text[0].plain_text === '00'){
            b.properties.년생.rich_text[0].plain_text = '2000'
          }
          return Number(a.properties.년생.rich_text[0].plain_text) - Number(b.properties.년생.rich_text[0].plain_text)
        })
      }
    },

    toggleModal: (state) => {state.modalState = !state.modalState},

    sendMember: (state, action) => {
      state.sendMember = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getMembersData.pending, (state) => {
      //fetch되기 전 수행할 action 작성
      console.log('로딩중..')
    })

    .addCase(getMembersData.fulfilled, (state, action) => {
      //fetch성공 후 수행할 action 작성
      console.log('로딩 끝!')
      state.membersData = action.payload
    })

    .addCase(getMembersData.rejected, (state) => {
      //fetch 실패 시 수행할 action 작성
      console.log('fetch 실패 ㅠㅠ')
    })
  },
})
export const { sortState, toggleModal, sendMember } = membersDataSlice.actions
export default membersDataSlice.reducer