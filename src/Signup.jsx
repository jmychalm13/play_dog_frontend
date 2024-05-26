import "./SignupLogin.css";
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
        // get new user ID
        const newId = response.data.id;
        window.location.href = `/login`;
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });
  };

  return (
    <section className="bg-gradient-to-b from-gray-300 to-emerald-800 h-screen flex items-center justify-center">
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
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-600">
              Image
            </label>
            <input type="image_url" name="image_url" className="mt-1 p-2 w-full border rounded-md border-black" />
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
            className="w-full bg-emerald-400 text-text-neutral-100 p-2 rounded-md hover:bg-emerald-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
