import axios from "axios";
import { useState } from "react";

export function DogNew() {
  const [dogData, setDogData] = useState({
    breed: "",
    name: "",
    age: 0,
    image_url: "",
    behaviors: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBehaviorInputChange = (event) => {
    const behaviors = event.target.value.split(",").map((behavior) => behavior.trim());
    setDogData({ ...dogData, behaviors });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUserId = +localStorage.getItem("userId");
    let responseId;
    if (event.target.checkValidity()) {
      axios
        .post("http://localhost:3000/dogs.json", {
          user_id: currentUserId,
          name: dogData.name,
          breed: dogData.breed,
          age: dogData.age,
          image_url: dogData.image_url,
        })
        .then((response) => {
          responseId = response.data.id;
          dogData.behaviors.map((newBehavior) => {
            axios
              .post("http://localhost:3000/behaviors.json", {
                dog_id: responseId,
                behavior: newBehavior,
              })
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          console.log(error);
        });
      event.target.reset();
      window.location.href = "/dogs";
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
              value={dogData.name}
              onChange={handleInputChange}
              placeholder="Enter pet name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="breed"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              value={dogData.breed}
              onChange={handleInputChange}
              placeholder="Enter pet's breed"
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="age"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              value={dogData.age}
              onChange={handleInputChange}
              placeholder="Enter pet's age"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="image_url"
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              value={dogData.image_url}
              onChange={handleInputChange}
              placeholder="Upload Pic"
              required
            />
          </div>
          <div>
            <input
              type="text"
              onChange={handleBehaviorInputChange}
              // value={behavior}
              className="focus:outline-none focus:ring-2 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              placeholder="Behaviors"
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
