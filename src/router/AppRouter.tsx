import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"
import Home from "../pages/Home";
import MemberFee from "../pages/MemberFee";
import PartPage from "../pages/PartPage";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="memberfee" element={<MemberFee />} />
        <Route path="partpage" element={<PartPage />} />
        <Route path="searchpage" element={<SearchPage />} />
      </Route>
    </Routes>
    )
}

export default AppRouter