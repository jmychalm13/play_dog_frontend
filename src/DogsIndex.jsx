import axios from "axios";
import { useState, useEffect } from "react";

export function DogsIndex() {
  const [dogs, setDogs] = useState([]);

  const jwt = localStorage.getItem("jwt");

  const getUserDogs = () => {
    axios
      .get("http://localhost:3000/dogs.json", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setDogs(response.data);
        console.log(response.data);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getUserDogs, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800 bg-cover bg-center h-screen relative">
      <h1 className="text-emerald-900 text-center text-5xl underline">Your Pets</h1>
      <div className="dogs">
        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="mx-auto my-3 px-4 flex flex-col items-center bg-white border border-emerald-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-emerald-100 border-emerald-700 bg-emerald-800 hover:bg-emerald-700"
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={dog.image_url}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-neutral-100">{dog.name}</h5>
              <p className="text-xl text-neutral-100">Breed: {dog.breed}</p>
              <p className="text-neutral-100 text-xl">Behaviors:</p>
              {dog.behaviors.map((behavior) => (
                <div key={behavior.id}>
                  <p className="text-neutral-100 text-large">{behavior.behavior}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
