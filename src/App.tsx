import { ThemeProvider } from "styled-components";
import AppRouter from './router/AppRouter.tsx'
import { GlobalStyle } from './style/globalStyled.tsx'
import { useState, useEffect } from "react"
import { useAppSelector, useAppDispatch } from './store/hook.ts'
import {  setMembers, setBanMembers, setHof, setAccountList } from './store/slice.ts'
import ScrollToTop from './components/common/ScrollToTop.tsx'
import { originTheme } from "./style/theme.tsx";
import Splash from "./components/common/Splash.tsx";
import { onValue, ref, set } from "firebase/database"
import { auth, database, dbFunc } from "./firebase/firebaseFunc.ts"
import { onAuthStateChanged } from "firebase/auth"
import { loginUserSend } from "./store/slice.ts"
import LoginPage from "./pages/LoginPage.tsx"
import Waiting from "./components/common/Waiting.tsx";

const App = () => {
  const dispatch = useAppDispatch()
  const { loginUser } = useAppSelector(state => state.membersData)
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
    //초기 데이터 받아오기
    dbFunc.getAllMembers((data: any) => dispatch(setMembers(data)))
    dbFunc.getBanMembers((data: any) => dispatch(setBanMembers(data)))
    dbFunc.getHof((data: any) => dispatch(setHof(data)))
    dbFunc.getAllAccount((data: any) => dispatch(setAccountList(data)))
  },[dispatch])


  useEffect(() => {
    //로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      // 로그인 상태 redux 전송
      const send = (level: number) => {dispatch(loginUserSend({
        uid: user ? user.uid : '',
        name: user ? user.displayName : '',
        photoURL: user ? user.photoURL : '',
        state: user ? true : false,
        level: user ? level : 0,
        email: user ? user.email: ''
      }))}

      if(user){
        // 로그인 된 경우, 실시간 데이터베이스에서 회원 등급 가져옴
        const userRoleRef = ref(database, 'userLevels/' + user.uid)
        onValue(userRoleRef, (snapshot) => {
          const data = snapshot.val()
          if(data){
            //계정 데이터베이스가 있을 경우 저장된 회원 등급 전송
            send(data?.level)
          }else if(user.displayName){
            //없을 경우 계정 데이터베이스 생성 후 레벨 0 전송
            const accountRef = ref(database, '/userLevels/' + user.uid)
            const newAccount = {name: user.displayName, level: 0}
            set(accountRef, newAccount)
            send(0)
          }
          setIsLoading(false)
        })
      }else{
        //로그아웃 시 로그인 화면으로 이동
        send(0)
        setIsLoading(false)
      }
    })

    // 컴포넌트 unmount시 리스너 해제
    return () => unsubscribe()
  }, [loginUser.state])

  if(isLoading){return (<>
      <ThemeProvider theme={originTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <Splash />
      </ThemeProvider>
  </>)}  
  if(loginUser.state){return (<>
    {loginUser.level >= 1 ? 
    <>
      <ThemeProvider theme={originTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <AppRouter />
      </ThemeProvider>
    </>:
    <>
      <ThemeProvider theme={originTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <Waiting />
      </ThemeProvider>
    </>}</>)
  }else{return (<>
      <ThemeProvider theme={originTheme}>
        <GlobalStyle />
        <ScrollToTop />
        <LoginPage />
      </ThemeProvider>
    </>)}
}

export default App