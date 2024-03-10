import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UsersIndex } from "./UsersIndex";
import { DogsIndex } from "./DogsIndex";
import { UserShow } from "./UserShow";
import { DogShow } from "./DogShow";
import { DogNew } from "./DogNew";

export function Content() {
  return (
    <div>
      <Routes>
        <Route path="/users" element={<UsersIndex />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dogs" element={<DogsIndex />} />
        <Route path="/users/:id" element={<UserShow />} />
        <Route path="/dogs/:id" element={<DogShow />} />
        <Route path="/dogs/new" element={<DogNew />} />
      </Routes>
    </div>
  );
}
