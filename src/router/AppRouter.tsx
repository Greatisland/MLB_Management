import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"
import MemberFee from "../pages/MemberFee";
import PartPage from "../pages/PartPage";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="infopage" element={<Home />} />
        <Route path="memberfee" element={<MemberFee />} />
        <Route path="partpage" element={<PartPage />} />
      </Route>
    </Routes>
    )
}

export default AppRouter