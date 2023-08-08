import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout.tsx"
import MemberFee from "../pages/MemberFee.tsx";
import PartPage from "../pages/PartPage.tsx";
import Home from "../pages/Home.tsx";
import HallOfFame from "../pages/HallOfFame.tsx";
import SecretBoard from "../pages/SecretBoard.tsx";
import SecretBoardView from "../components/secretboard/SecretBoardView.tsx";
import SecretBoardWrite from "../components/secretboard/SecretBoardWrite.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="infopage" element={<Home />} />
        <Route path="partpage" element={<PartPage />} />
        <Route path="memberfee" element={<MemberFee />} />
        <Route path="halloffame" element={<HallOfFame />} />
        <Route path="secretboard" element={<SecretBoard />} />
        <Route path="boardview/:id" element={<SecretBoardView />} />
        <Route path="boardwrite/:id" element={<SecretBoardWrite />} />
      </Route>
    </Routes>
    )
}

export default AppRouter