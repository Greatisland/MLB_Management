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
import { auth, dbFunc } from "../firebase/firebaseFunc"
import { database } from "../firebase/firebaseFunc"
import { onValue, ref } from "firebase/database"
import type { Member } from "../store/slice"

const Home = () => {
  const { membersData: membersDataFromRedux, loginUser } = useAppSelector(state => state.membersData)
  const dispatch = useAppDispatch()
  const [ isLoading, setIsLoading ] = useState(true)
  const [membersData, setMembersData] = useState<[string, Member][] | null>(null)

  //membersData를 로컬에 저장
  useEffect(() => {
    setMembersData(membersDataFromRedux)
  }, [membersDataFromRedux])


  const handleUser = () => {
    console.log(isLoading)
    if(!isLoading && membersData && loginUser.state){
      console.log(loginUser)
      console.log(membersData)
      //현재 로그인한 사용자의 데이터베이스 찾기
      const currentUser = membersData.find((member) => {
        return member[1].name === loginUser.name
      })
      console.log(currentUser)
      //찾을 경우
      if(currentUser){
        //승인되지 않은 유저의 경우 uid, email 업데이트 및 승인
        if(!currentUser[1].approval){
          const updateDB = {email: loginUser.email, uid: loginUser.uid, approval: true}
          dbFunc.updateMember(currentUser[0], updateDB)
        }
      }else if(!currentUser){
        //찾지 못할 경우 신규 사용자 추가
        const updateNewDB = {
          email: loginUser.email, uid: loginUser.uid, name: loginUser.name, level: 1,
          join: '',
          year: '',
          etc: '',
          gender: '',
          pay: false,
          special: '',
          target: '',
          approval: false,
          break: false
        }
        dbFunc.addMember(updateNewDB)
      }
    }
  }

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
        const userRoleRef = ref(database, 'userLevels/' + user.uid)
        onValue(userRoleRef, (snapshot) => {
          const data = snapshot.val()
          send(data?.level)
          setIsLoading(false)
        })
      }else{
        //로그아웃 시 로그인 화면으로 이동
        send(1)
        setIsLoading(false)
      }
    })

    // 컴포넌트 unmount시 리스너 해제
    return () => unsubscribe()
  }, [loginUser.state])

  // useEffect(() => {
  //   handleUser()
  // }, [isLoading, loginUser.state, membersData])

  if(isLoading){return <Splash />}
  if(loginUser.state){return (
    <HomeContainer>
      <BtnList />
      <PenddingList />
      <HomeList />
      <BreakList />
      <BanList />
      <Footer />
    </HomeContainer>
  )}else{return <LoginPage />}
}

export default Home