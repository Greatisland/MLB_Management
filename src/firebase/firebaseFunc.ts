import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, '/memberList')
export const dbFunc = {
  //멤버 추가
  //멤버 수정
  //멤버 삭제
  //전원 멤버 리스트 읽어오기
  // addMember () {
  //   onValue(dbRef, (snapshot) => {
  //     console.log(snapshot)
  //   })
  // },
  addMember(member: any) {
    const newMemberRef = push(dbRef);
    set(newMemberRef, member);
  },
}