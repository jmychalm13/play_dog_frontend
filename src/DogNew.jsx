import axios from "axios";
import { useState } from "react";

export function DogNew() {
  const [dogData, setDogData] = useState({});
  const [behaviorData, setBehaviorData] = useState({
    behavior1: "",
  });

  const handleBehaviorInputChange = (event) => {
    setBehaviorData({ ...behaviorData, [event.target.name]: event.target.value });
  };

  const handleAddBehavior = (behaviorData) => {
    const params = {
      dog_id: dogData.id,
      behavior: behaviorData.behavior1,
    };
    if (params.dog_id) {
      axios.post("http://localhost:3000/behaviors.json", params).then((response) => {
        console.log("behaviorResponse", response);
      });
    } else {
      console.log("no dog id");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (event.target.checkValidity()) {
      const currentUser = +localStorage.getItem("userId");
      const params = new FormData(event.target);
      params.append("user_id", currentUser);
      axios
        .post("http://localhost:3000/dogs.json", params)
        .then((response) => {
          console.log(response.data);
          // event.target.reset();
          // window.location.href = "/dogs";
          setDogData(response.data);
          handleAddBehavior(behaviorData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="relative h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1518640165980-d3e0e2aa6c1e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gray-900/40"></div>
      <div className="py-12 z-10 relative w-1/2 flex items-center justify-center text-white ml-auto">
        <form onSubmit={handleSubmit} className="border-emerald-800 shadow-xl p-12 rounded-lg border space-y-4">
          <h1 className="text-3xl font-bold mb-4 text-center">Add Pet</h1>
          <div>
            <input
              type="text"
              name="name"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Enter pet name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="breed"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Enter pet's breed"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="age"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Enter pet's age"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="image_url"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Upload Pic"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="behavior1"
              onChange={handleBehaviorInputChange}
              value={behaviorData.behavior1}
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Behavior #1"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-emerald-800 px-2 rounded-md border border-black">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
