import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout.tsx";
import MemberFee from "../pages/MemberFee.tsx";
import PartPage from "../pages/PartPage.tsx";
import Home from "../pages/Home.tsx";
import HallOfFame from "../pages/HallOfFame.tsx";
import SecretBoard from "../pages/SecretBoard.tsx";
import SecretBoardView from "../components/secretboard/SecretBoardView.tsx";
import SecretBoardWrite from "../components/secretboard/SecretBoardWrite.tsx";
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hook.ts";

const AppRouter = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [ startX, setStartX ] = useState<number | null>(null)
  const pageList = ['/infopage', '/partpage', '/memberfee', '/secretboard', '/halloffame']
  const currentPageIndex = pageList.findIndex(page => page === location.pathname)
  const { isSwiping } = useAppSelector(state => state.membersData)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX)
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      if(currentPageIndex !== -1 && isSwiping){
        if (startX && startX - endX > 50) {
          const moveIndex = (currentPageIndex + 1) <= pageList.length - 1 ? currentPageIndex + 1 : 0
          navigate(pageList[moveIndex])
        } else if (endX - (startX || 0) > 50) {
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
          <Route index element={<Home />} />
          <Route path="infopage" element={<Home />} />
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