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
    //memeberUpdate, memberDelete는 api호출을 최소화하기 위한 메소드
    memberUpdate (state, action) {
      let index = state.membersData.findIndex(member => member.id === action.payload.id)
      if(index !== -1){state.membersData.splice(index, 1, action.payload)}
      else{
        state.membersData = [...state.membersData, action.payload]
      }
    },

    memberDelete (state, action) {
      let index = state.membersData.findIndex(member => member.id === action.payload.id)
      state.membersData.splice(index, 1)
    },

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

    toggleModal (state) {state.modalState = !state.modalState},

    sendMember (state, action) {
      state.sendMember = action.payload
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
    })

    .addCase(getMembersData.rejected, () => {
      //fetch 실패 시 수행할 action 작성
      console.log('fetch 실패 ㅠㅠ')
    })
  },
})
export const { sortState, toggleModal, sendMember, memberUpdate, memberDelete } = membersDataSlice.actions
export default membersDataSlice.reducer