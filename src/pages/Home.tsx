import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/Footer"
import { useAppDispatch, useAppSelector } from "../store/hook"
import LoginPage from "./LoginPage"

import Splash from "../components/Splash"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { loginUserSend } from "../store/slice"
import { auth } from "../firebase/firebaseFunc"
import { database } from "../firebase/firebaseFunc"
import { onValue, ref } from "firebase/database"
import { useNavigate } from "react-router"

const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    //로그인 상태 확인
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      // 로그인 상태 redux 전송
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
          setIsLoading(false)
        })
      }else{
        //로그아웃 시 로그인 화면으로 이동
        send(1)
        navigate('/')
        setIsLoading(false)
      }

    })

    // 컴포넌트 unmount시 리스너 해제
    return () => unsubscribe()
  }, [])

  if(isLoading){return <Splash />}
  if(loginUser.state){return (
    <HomeContainer>
      <BtnList />
      <HomeList />
      <Footer />
    </HomeContainer>
  )}
  if(!loginUser.state){return <LoginPage />}
  return (
    <>
    </>
  )
}

export default Home