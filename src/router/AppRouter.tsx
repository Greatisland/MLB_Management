import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"
import MemberFee from "../pages/MemberFee";
import PartPage from "../pages/PartPage";
import Home from "../pages/Home";
import HallOfFame from "../pages/HallOfFame";
import SecretBoard from "../pages/SecretBoard";
import SecretBoardView from "../components/SecretBoardView";
import SecretBoardWrite from "../components/SecretBoardWrite";

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