import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UsersIndex } from "./UsersIndex";
import { DogsIndex } from "./DogsIndex";
import { UserShow } from "./UserShow";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersIndex />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dogs" element={<DogsIndex />} />
        <Route path="/profile" element={<UserShow />} />
      </Routes>
    </div>
  );
}
