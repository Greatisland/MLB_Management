import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppDispatch } from './store/hook'
import {  setMembers } from './store/slice'
import ScrollToTop from './components/ScrollToTop'
import { dbFunc } from './firebase/firebaseFunc'

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dbFunc.getAllMembers((data: any) => dispatch(setMembers(data)))
  },[dispatch])

  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <AppRouter />
    </>
  )
}

export default App