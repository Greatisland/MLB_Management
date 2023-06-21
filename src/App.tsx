import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppDispatch } from './store/hook'
import { getMembersData } from './store/slice'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMembersData())
  },[])

  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <AppRouter />
    </>
  )
}

export default App
