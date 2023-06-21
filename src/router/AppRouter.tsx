import { Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout"
import Home from "../pages/Home";
import MemberFee from "../pages/MemberFee";
import MemberPart from "../pages/MemberPart";

const AppRouter = () => {
  return (
    <>
    {/* <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/memberfee" element={<MemberFee />} />
        <Route path="/memberpart" element={<MemberPart />} />
      </Route>
    </Routes>
    </> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="memberfee" element={<MemberFee />} />
          <Route path="memberpart" element={<MemberPart />} />
        </Route>
      </Routes>
    </>
    )
}

export default AppRouter