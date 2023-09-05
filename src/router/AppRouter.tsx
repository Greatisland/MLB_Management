import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import MemberFee from "../pages/MemberFee.tsx";
import PartPage from "../pages/PartPage.tsx";
import InfoPage from "../pages/InfoPage.tsx";
import HallOfFame from "../pages/HallOfFame.tsx";
import SecretBoard from "../pages/SecretBoard.tsx";
import SecretBoardView from "../components/secretboard/SecretBoardView.tsx";
import SecretBoardWrite from "../components/secretboard/SecretBoardWrite.tsx";
import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hook.ts";

const AppRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isSwiping, loginUser } = useAppSelector(state => state.membersData)
  const [ startX, setStartX ] = useState<number | null>(null)
  const pageList = loginUser.level >= 2 ? ['/infopage', '/partpage', '/memberfee', '/secretboard', '/halloffame'] : ['/infopage', '/partpage', '/secretboard', '/halloffame'] 
  let currentPageIndex = pageList.findIndex(page => page === location.pathname) 
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX)
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      if(isSwiping){
        if(startX && startX - endX > 100) {
          const moveIndex = (currentPageIndex + 1) <= pageList.length - 1 ? currentPageIndex + 1 : 0
          navigate(pageList[moveIndex])
        } else if (endX - (startX || 0) > 100) {
          const moveIndex = (currentPageIndex - 1) >= 0 ? currentPageIndex - 1 : pageList.length - 1
          navigate(pageList[moveIndex])
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }

  }, [startX, navigate, currentPageIndex])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<InfoPage />} />
        <Route path="infopage" element={<InfoPage />} />
        <Route path="partpage" element={<PartPage />} />
        <Route path="memberfee" element={<MemberFee />} />
        <Route path="secretboard" element={<SecretBoard />} />
        <Route path="boardview/:id" element={<SecretBoardView />} />
        <Route path="boardwrite/:id" element={<SecretBoardWrite />} />
        <Route path="halloffame" element={<HallOfFame />} />
      </Route>
    </Routes>
  )
}

export default AppRouter