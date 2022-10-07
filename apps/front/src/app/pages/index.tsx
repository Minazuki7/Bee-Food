import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import Owner from "./Owner";
import SuperAdmin from "./SuperAdmin";

import Register from "./Register";

const Pages = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/owner" element={<Owner />} />
      <Route path="/super-admin" element={<SuperAdmin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Pages;
