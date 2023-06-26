import { initializeApp } from 'firebase/app'
import { getDatabase, remove, ref, onValue, push, set, update } from 'firebase/database'
import firebaseConfig from './firebaseConfig'
import type { Member } from '../store/slice'

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const dbRef = ref(database, '/memberList')



export const dbFunc = {

  // 멤버 추가
  addMember(member: Member) {
    const newMemberRef = push(dbRef)
    set(newMemberRef, member)
  },

  // 멤버 수정
  updateMember(memberId: string, updatedMember: Partial<Member>) {
    const memberRef = ref(database, `/memberList/${memberId}`)
    update(memberRef, updatedMember)
  },

  // 멤버 삭제
  removeMember(memberId: string) {
    const memberRef = ref(database, `/memberList/${memberId}`)
    remove(memberRef)
  },

  // 전원 멤버 리스트 읽어오기
  getAllMembers(callback: any) {
    onValue(dbRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },
}