import axios from "axios";
import { useState } from "react";

export function Signup() {
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("http://localhost:3000/users.json", params)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        {/* Signup Form Here */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              User Name
            </label>
            <input type="text" name="name" className="mt-1 p-2 w-full border rounded-md" />
          </div>
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
          {/* Input Field */}
          <div className="mb-4">
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-600">
              Retype Password
            </label>
            <input type="password" name="password_confirmation" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white p-2 rounded-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
