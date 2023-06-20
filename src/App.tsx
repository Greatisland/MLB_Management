import AppRouter from './router/AppRouter'
import { GlobalStyle } from './style/globalStyled'
import { useEffect } from "react"
import { useAppDispatch } from './store/hook'
import { getMembersData } from './store/slice'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMembersData())
  },[])

  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  )
}

export default App
