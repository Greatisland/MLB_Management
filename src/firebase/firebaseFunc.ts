import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, signInWithPopup, signOut  } from "firebase/auth"
import { getDatabase, remove, ref, onValue, push, set, update } from 'firebase/database'
import firebaseConfig from './firebaseConfig'
import { loginUserSend, type Member } from '../store/slice'


//firebase 초기화
const app = initializeApp(firebaseConfig)
//데이터베이스
export const database = getDatabase(app)
//회원관련
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
//database 
const dbRef = ref(database, '/memberList')

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
}

//회원 관련 함수
export const authFunc = {
  //이메일 회원가입
  createAccount(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
    })
  },

  //구글 로그인
  loginGoogle () {
    // signInWithRedirect(auth, googleProvider)
    signInWithPopup(auth, googleProvider)
  },

  loginFacebook() {
    signInWithRedirect(auth, facebookProvider)
  },

  //로그인
  loginAccount(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
  },

  //유저 확인
  stateAccount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        console.log(uid + '가 로그인 상태')
      } else {
        console.log('로그아웃 상태')
      }
    })
  },

  //로그아웃
  logout() {
    console.log('로그아웃')
    signOut(auth)
  }
}



