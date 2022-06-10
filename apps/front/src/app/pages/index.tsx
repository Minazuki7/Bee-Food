import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Admin from "./Admin";

const Pages = () => {
  return (
    <Routes>
      <Route path="/Admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default Pages;
