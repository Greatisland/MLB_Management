import { ThemeProvider } from "styled-components";
import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from './store/hook'
import {  setMembers, setBanMembers, setHof } from './store/slice'
import ScrollToTop from './components/ScrollToTop'
import { dbFunc } from './firebase/firebaseFunc'
import { useNavigate } from 'react-router'
import { originTheme } from "./style/theme";

const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loginUser } = useAppSelector(state => state.membersData)
  useEffect(() => {
    dbFunc.getAllMembers((data: any) => dispatch(setMembers(data)))
    dbFunc.getBanMembers((data: any) => dispatch(setBanMembers(data)))
    dbFunc.getHof((data: any) => dispatch(setHof(data)))
  },[dispatch])

  //새로고침 시 404에러를 해결하기 위해 모든 경로에서 새로고침시 초기페이지로 리다이렉트
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // 새로고침으로 인한 beforeunload 이벤트인 경우, sessionStorage에 플래그 설정
  //     sessionStorage.setItem('isReload', 'true')
  //   }

  //   // beforeunload 이벤트 핸들러 등록
  //   window.addEventListener('beforeunload', handleBeforeUnload)

  //   // 새로고침으로 인한 렌더링인 경우 첫 도메인으로 리다이렉트
  //   if (sessionStorage.getItem('isReload')) {
  //     sessionStorage.removeItem('isReload') // 플래그 제거
  //     navigate('/')
  //   }

  //   // 컴포넌트 unmount시 beforeunload 이벤트 핸들러 제거
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //   }
  // }, [navigate])

  //로그인되지 않았을 경우, 혹은 로그인 정보가 redux에서 사라졌을 경우 메인 화면으로 이동.
  useEffect(() => {
    if(!loginUser.state){
      navigate('/')
    }
  }, [navigate])

  return (
    <ThemeProvider theme={originTheme}>
      <GlobalStyle />
      <ScrollToTop />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App