import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppDispatch } from './store/hook'
import { loginUserSend, setMembers } from './store/slice'
import ScrollToTop from './components/ScrollToTop'
import { auth, database, dbFunc } from './firebase/firebaseFunc'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router'
import { getDatabase, ref, onValue } from "firebase/database"
// import './firebase/firebaseMessage'

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dbFunc.getAllMembers((data: any) => dispatch(setMembers(data)))
  },[dispatch])


  useEffect(() => {
    //로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //로그인 상태 redux 전송
      const send = (level: number) => {dispatch(loginUserSend({
        uid: user ? user.uid : '',
        name: user ? user.displayName : '',
        photoURL: user ? user.photoURL : '',
        state: user ? true : false,
        level: user ? level : 1
      }))}

      if(user){
        // 로그인 된 경우, 실시간 데이터베이스에서 회원 등급 가져옴
        const userRoleRef = ref(database, 'userLevels/' + user.uid);
        onValue(userRoleRef, (snapshot) => {
          const data = snapshot.val()
          send(data)
        })
      }else{
        //로그아웃 시 로그인 화면으로 이동
        send(1)
        navigate('/')
      }
    })

    // 컴포넌트 unmount시 리스너 해제
    return () => unsubscribe()
  }, [])


  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <AppRouter />
    </>
  )
}

export default App