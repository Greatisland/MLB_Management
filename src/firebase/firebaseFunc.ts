
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut  } from "firebase/auth"
import { getDatabase, remove, ref, onValue, push, set, update } from 'firebase/database'
import { type Member, type Ban, type Hof } from '../store/slice'
import Swal from 'sweetalert2'
import { app } from "./firebaseConfig"

//데이터베이스
export const database = getDatabase(app)

//회원관련
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

//database 
const dbRef = ref(database, '/memberList')
const banRef = ref(database, '/banList')
const hofRef = ref(database, '/halloffame')

//데이터베이스 함수
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

  // 밴 리스트 읽어오기
  getBanMembers(callback: any){
    onValue(banRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },

  // 밴 추가
  addBan(member: Ban) {
    const newMemberRef = push(banRef)
    set(newMemberRef, member)
  },

  // 밴 수정
  updateBan(memberId: string, updatedMember: Partial<Ban>) {
    const memberRef = ref(database, `/banList/${memberId}`)
    update(memberRef, updatedMember)
  },

  // 밴 삭제
  removeBan(memberId: string) {
    const memberRef = ref(database, `/banList/${memberId}`)
    remove(memberRef)
  },

  // Hof 추가
  addHof(hof: Hof) {
    const newHofRef = push(hofRef)
    set(newHofRef, hof)
  },

  // Hof 수정
  updateHof(hofId: string, updateHof: Partial<Hof>) {
    const hofRef = ref(database, `/halloffame/${hofId}`)
    update(hofRef, updateHof)
  },

  // Hof 읽어오기
  getHof(callback: any){
    onValue(hofRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },

  // Hof 삭제
  removeHof(hofId: string) {
    const hofRef = ref(database, `/halloffame/${hofId}`)
    remove(hofRef)
  },
}

//회원 관련 함수
export const authFunc = {
  //이메일 회원가입
  createAccount(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // 사용자 계정이 생성되었습니다.
    const user = userCredential.user

    // 사용자 프로필 정보를 업데이트합니다.
    return updateProfile(user, {
        displayName,
      })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  },

  //구글 로그인
  loginGoogle () {
    // signInWithRedirect(auth, googleProvider)
    signInWithPopup(auth, googleProvider)
  },
  
  //로그인
  loginAccount(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: '이메일 또는 비밀번호가 틀렸네요!',
         showConfirmButton: false,
        timer: 800
      })
    })
  },

  //로그아웃
  logout() {
    signOut(auth)
  }
}



