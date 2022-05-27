import { Route, Routes } from "react-router-dom";
import Login from "./Login";

const Pages = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default Pages;
