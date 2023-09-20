import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  sendPasswordResetEmail
} from "firebase/auth"
import { getDatabase, remove, ref, onValue, push, set, update, get, runTransaction } from 'firebase/database'
import { getAnalytics } from "firebase/analytics";
import { type Member, type Ban, type Hof } from '../store/slice.ts'
import Swal from 'sweetalert2'
import { app } from "./firebaseConfig"

//데이터베이스
export const database = getDatabase(app)

//회원관련
export const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

//database 
const dbRef = ref(database, '/memberList')
const accountRef = ref(database, '/userLevels')
const banRef = ref(database, '/banList')
const hofRef = ref(database, '/halloffame')
const boardRef = ref(database, '/board')
const feeRef = ref(database, '/fee')
const meetRef = ref(database, '/meetData')

//애널리틱스
const analytics = getAnalytics(app)

//데이터베이스 메소드
export const dbFunc = {
  //찌꺼기 데이터 제거
  deleteGarbage(memberId: string, param: string) {
    const garbageRef = ref(database, `/memberList/${memberId}/${param}`)
    remove(garbageRef)
  },

  // 멤버 추가
  addMember(member: Member) {
    const newMemberRef = push(dbRef)
    set(newMemberRef, member)
  },

  // 멤버 수정
  updateMember(memberId: string, updatedMember: any) {
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

  // 계정 수정하기
  updateAccount(memberId: string, updatedMember: any) {
    const memberRef = ref(database, `/userLevels/${memberId}`)
    update(memberRef, updatedMember)
  },


  // 전원 계정 리스트 읽어오기
  getAllAccount(callback: any) {
    onValue(accountRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },

  // 계정 레벨정보 삭제
  removeAccount(memberId: string) {
    const memberRef = ref(database, `/userLevels/${memberId}`)
    remove(memberRef)
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
  
  // 벙 정보 읽어오기
  getMeet(callback: any) {
    onValue(meetRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },

  // 글 추가
  addArticle(article: any) {
    const newArticleRef = push(boardRef)
    set(newArticleRef, article)
  },

  // 글 수정
  updateArticle(articleId: string, updateArticle: any) {
    const articleRef = ref(database, `/board/${articleId}`)
    update(articleRef, updateArticle)
  },

  // 글 삭제
  removeArticle(articleId: string) {
    const articleRef = ref(database, `/board/${articleId}`)
    remove(articleRef)
  },

  // 게시판 읽어오기
  getBoard(callback: any) {
    onValue(boardRef, (snapshot) => {
      callback(Object.entries(snapshot.val()))
    })
  },

  // 글 읽어오기
  async getArticle(articleId: string | undefined) {
    const articleRef = ref(database, `/board/${articleId}`)
    
    try {
      const snapshot = await get(articleRef)
      
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log('No data available')
      }
    } catch (error) {
      console.error(error)
    }
  },

  //칭찬게시판 글 조회수 저장
  incrementViewCount(postId: string, uid: string) {
    //로컬스토리지에 저장하여 중복집계 방지
    const viewedPosts: { [key: string]: boolean } = JSON.parse(localStorage.getItem('viewedPosts') || '{}')
    const postRef = ref(database, `/board/${postId}`)
    const userNameRef = ref(database, `/userLevels/${uid}`)
    onValue(userNameRef, (snapshot) => {
      const userName = snapshot.val()
      if(!viewedPosts[postId]){
        runTransaction(postRef, (post) => {
          if (post) {
            post.viewCount = (post.viewCount || 0) + 1
            if(post.viewUsers){
              post.viewUsers = [...new Set([...post.viewUsers, userName.name])]
            }else{
              post.viewUsers = [userName.name]
            }
          }
          return post
        })
      }
    })

    viewedPosts[postId] = true
    localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts))
  },

  //회비 수정
  updateFee(updateFee: number) {
    return new Promise<void>((resolve, reject) => {
      try{
        set(feeRef, {gold: updateFee})
        resolve()
      }catch(error){
        reject(error)
      }
    })
  },

  //회비 읽어오기
  getFee(callback: any){
    onValue(feeRef, (snapshot) => {
      callback(snapshot.val())
    })
  },
}

//회원 관련 메소드
export const authFunc = {
  //이메일 회원가입
  createAccount(email: string, password: string, displayName: string) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // 사용자 계정 생성
    const user = userCredential.user

    // 사용자 프로필 정보 업데이트
    return updateProfile(user, {
        displayName,
      })
    })
    .then(() => {
      signOut(auth)
      Swal.fire({
        icon: 'success',
        title: '성공적으로 가입되었어요! 로그인을 진행해주세요.',
        showConfirmButton: false,
        timer: 800
      })
    })
    .catch((error) => {
      Swal.fire({
        icon: 'warning',
        title: '이미 존재하는 이메일이에요!',
        showConfirmButton: false,
        timer: 800
      }) 
    })
  },

  //구글 로그인
  loginGoogle () {
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
  },

  //비밀번호 재설정
  resetPass(email: string) {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      Swal.fire(`가입자 정보를 찾을 수 없음!`, '가입되지 않은 이메일입니다.', 'error')
    })
  }
}



