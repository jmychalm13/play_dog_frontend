import { Routes, Route } from "react-router-dom";
import { UsersIndex } from "./UsersIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
