import BtnList from "../components/BtnList"
import HomeList from "../components/HomeList"
import BreakList from "../components/BreakList"
import BanList from "../components/BanList"
import { HomeContainer } from "../style/homeStyled"
import Footer from "../components/Footer"
import { useAppDispatch, useAppSelector } from "../store/hook"
import LoginPage from "./LoginPage"
import Splash from "../components/Splash"
import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { loginUserSend } from "../store/slice"
import { auth, dbFunc } from "../firebase/firebaseFunc"
import { database } from "../firebase/firebaseFunc"
import { onValue, ref } from "firebase/database"

const Home = () => {
  const { membersData, loginUser } = useAppSelector(state => state.membersData)
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
        level: user ? level : 1,
        email: user ? user.email: ''
      }))}
      if(user){
        // 로그인 된 경우, 실시간 데이터베이스에서 회원 등급 가져옴
        const userRoleRef = ref(database, 'userLevels/' + user.uid);
        onValue(userRoleRef, (snapshot) => {
          const data = snapshot.val()
          send(data)
          setIsLoading(false)
        })

        const currentLoginMember = () => {
          //현재 로그인한 사용자의 데이터베이스 찾기
          let index = membersData.findIndex((member) => {
            if(member[1].name === user.displayName){
              return member
            }
          })
          //찾지 못할 경우 함수 종료
          if(index === -1){return}
      
          const memberId = membersData[index][0]
          const updateDB = {email: user.email, uid: user.uid}
          dbFunc.updateMember(membersData[index][0], updateDB)
        }

        currentLoginMember()
      }else{
        //로그아웃 시 로그인 화면으로 이동
        send(1)
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
      <BreakList />
      <BanList />
      <Footer />
    </HomeContainer>
  )}
  if(!loginUser.state){return <LoginPage />}
  return <></>
}

export default Home