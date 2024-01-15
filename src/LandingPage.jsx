import "./LandingPage.css";
import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <div
      className="hero bg-cover bg-center h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1638766211363-96560786b7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80')",
      }}
    >
      {/* Text at the top with breathing room */}
      <div className="heading absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 w-full">
        <h1 className="text-6xl font-bold mb-4">PlayDog</h1>
        <p className="text-2xl">Open up a world of fun for you and your pup</p>
        <div className="mt-8">
          {/* Add your buttons here */}
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Login</button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Sign Up</button>
          </Link>
        </div>
      </div>

      {/* Buttons directly beneath the text */}
    </div>
  );
}
