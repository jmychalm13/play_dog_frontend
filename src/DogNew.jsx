import axios from "axios";
import { useState } from "react";
import { RatingSystem } from "./RatingSystem";

export function DogNew() {
  const predefinedBehaviors = ["Playful", "Happy", "Reactive", "Calm", "Nervous"];

  const [uploadedImg, setUploadedImg] = useState(null);

  const [behaviors, setBehaviors] = useState(predefinedBehaviors.map((behavior) => ({ behavior, rating: 1 })));

  const [dogData, setDogData] = useState({
    breed: "",
    name: "",
    age: 0,
  });

  const handleRatingChange = (behaviorName, rating) => {
    setBehaviors((prevBehaviors) => prevBehaviors.map((b) => (b.behavior === behaviorName ? { ...b, rating } : b)));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetFile = (event) => {
    if (event.target.files.length > 0) {
      setUploadedImg(event.target.files[0]);
      console.log(event.target.files[0]);
    } else {
      console.log("problem Houston");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentUserId = +localStorage.getItem("userId");
    // let responseId;
    if (event.target.checkValidity()) {
      const formData = new FormData();
      formData.append("user_id", currentUserId);
      formData.append("name", dogData.name);
      formData.append("breed", dogData.breed);
      formData.append("age", dogData.age);
      formData.append("image_url", uploadedImg);
      axios
        .post("http://localhost:3000/dogs.json", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          const dogId = response.data.id;
          console.log("response", response);
          const behaviorData = {
            dog_id: dogId,
            behavior_attributes: behaviors,
          };
          axios.post("http://localhost:3000/behaviors.json", behaviorData).then((response) => {
            console.log(response);
          });
          // event.target.reset();
          // window.location.href = `/users/${userId}`;
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
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-200 border-emerald-800 shadow-2xl p-6 rounded-lg border space-y-4"
        >
          <h1 className="text-emerald-900 text-3xl font-bold mb-4 text-center">Add Pet</h1>
          <div>
            <input
              type="text"
              name="name"
              className="focus:outline-none focus:ring-0 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
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
              className="focus:outline-none focus:ring-0 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
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
              className="focus:outline-none focus:ring-0 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              value={dogData.age || ""}
              onChange={handleInputChange}
              placeholder="Enter pet's age"
              required
            />
          </div>
          <p className="text-xl text-emerald-900 font-bold underline">Behaviors</p>
          {behaviors.map((b, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">{b.behavior}</label>
              <RatingSystem rating={b.rating} onRatingChange={(rating) => handleRatingChange(b.behavior, rating)} />
            </div>
          ))}
          <div>
            <input
              type="file"
              name="image_url"
              className="focus:outline-none focus:ring-0 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
              onChange={handleSetFile}
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
