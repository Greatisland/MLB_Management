import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, signInWithPopup, signOut  } from "firebase/auth"
import { getDatabase, remove, ref, onValue, push, set, update } from 'firebase/database'
import firebaseConfig from './firebaseConfig'
import type { Member } from '../store/slice'

//firebase 초기화
const app = initializeApp(firebaseConfig)
//데이터베이스
const database = getDatabase(app)
//회원관련
const auth = getAuth(app)
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
    signInWithRedirect(auth, googleProvider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = (result as any).user
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
      console.log(error)
    }) 
    
  },

  loginFacebook() {
    signInWithRedirect(auth, facebookProvider)
  },

  //로그인
  loginAccount(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      console.log('로그인')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
    })
  },

  //유저 확인
  stateAccount() {
    console.log('확인실행')

    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid
        console.log(uid + '가 로그인 상태')
        // ...
      } else {
        console.log('로그아웃 상태')
        // User is signed out
        // ...
      }
    })
  },

  //로그아웃
  logout() {
    signOut(auth)
    console.log('로그아웃')
  }
}



