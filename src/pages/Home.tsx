import BtnList from "../components/common/BtnList"
import HomeList from "../components/home/HomeList"
import BreakList from "../components/home/BreakList"
import BanList from "../components/home/BanList"
import PenddingList from "../components/home/PenddingList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/common/Footer"
import { useAppDispatch, useAppSelector } from "../store/hook"
import LoginPage from "./LoginPage"
import Splash from "../components/common/Splash"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { loginUserSend } from "../store/slice"
import { auth } from "../firebase/firebaseFunc"
import { database } from "../firebase/firebaseFunc"
import { onValue, ref, set } from "firebase/database"
import Waiting from "../components/common/Waiting"


const Home = () => {
  const { loginUser } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()
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

  if(isLoading){return <Splash />}
  if(loginUser.state){return (<>
    {loginUser.level >= 1 ? 
      <HomeContainer>
        <BtnList />
        <PenddingList />
        <HomeList />
        <BreakList />
        <BanList />
        <Footer />
      </HomeContainer> :
      <Waiting />
    }
  </>
  )}else{return <LoginPage />}
}

export default Home