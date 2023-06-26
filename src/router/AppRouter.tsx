import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"
import Home from "../pages/Home";
import MemberFee from "../pages/MemberFee";
import MemberPart from "../pages/MemberPart";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="memberfee" element={<MemberFee />} />
        <Route path="memberpart" element={<MemberPart />} />
        <Route path="SearchPage" element={<SearchPage />} />
      </Route>
    </Routes>
    )
}

export default AppRouter