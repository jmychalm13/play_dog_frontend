import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
