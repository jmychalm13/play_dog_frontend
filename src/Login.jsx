import axios from "axios";
import { useState } from "react";

const jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export function Login() {
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <section className="bg-gradient-to-b from-gray-300 to-emerald-800 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {/* Signup Form Here */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input type="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          {/* Input Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input type="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <button type="submit" className="w-full bg-emerald-400 p-2 rounded-md hover:bg-emerald-500">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
