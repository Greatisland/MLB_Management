import { ThemeProvider } from "styled-components";
import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from './store/hook'
import {  setMembers, setBanMembers, setHof, setAccountList } from './store/slice'
import ScrollToTop from './components/common/ScrollToTop'
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
    dbFunc.getAllAccount((data: any) => dispatch(setAccountList(data)))
  },[dispatch])

  //로그인되지 않았을 경우, 혹은 로그인 정보가 redux에서 사라졌을 경우 메인 화면으로 이동.
  useEffect(() => {
    if(!loginUser.state){
      navigate('/')
    }
  }, [navigate, loginUser.state])

  return (
    <ThemeProvider theme={originTheme}>
      <GlobalStyle />
      <ScrollToTop />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App