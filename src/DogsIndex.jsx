import axios from "axios";
import { useState, useEffect } from "react";
import { DogModal } from "./DogModal";
import { Link } from "react-router-dom";

export function DogsIndex() {
  const [dogs, setDogs] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [dogInfo, setDogInfo] = useState({});

  const getCurrentUser = () => {
    axios.get(`http://localhost:3000/users/${localStorage.getItem("userId")}.json`).then((response) => {
      setCurrentUser(response.data);
    });
  };

  const getAllDogs = () => {
    axios.get("http://localhost:3000/dogs.json").then((response) => {
      setDogs(response.data);
    });
  };

  const handleRemoveDog = (id) => {
    axios.delete(`http://localhost:3000/dogs/${id}.json`).then((response) => {
      console.log(response);
      setDogs(dogs.filter((dog) => dog.id !== id));
    });
  };

  const openEditModal = (dog) => {
    setDogInfo(dog);
    setIsEditModalVisible(true);
  };

  const handleHideEditModal = () => {
    setIsEditModalVisible(false);
    getAllDogs();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getAllDogs, []);
  useEffect(getCurrentUser, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800 bg-cover h-full bg-center relative">
      <h1 className="text-emerald-900 text-center text-5xl underline">All Pets</h1>
      {isEditModalVisible && (
        <div className="overlay">
          <DogModal
            show={isEditModalVisible}
            closeModal={handleHideEditModal}
            onClose={handleHideEditModal}
            dog={dogInfo}
          ></DogModal>
        </div>
      )}
      <div className="dogs">
        <div className="relative">
          <div className="absolute right-5 top-0">
            <Link to="/dogs/new">
              <button
                type="button"
                className="border border-emerald-900 rounded-lg p-2 shadow-lg hover:bg-gray-300 bg-gray-200"
              >
                Add Pet
              </button>
            </Link>
          </div>
        </div>
        {dogs.map((dog) => (
          <div
            key={dog.id}
            className="mx-auto my-3 px-4 flex flex-col items-center bg-emerald-800 border dark:border-emerald-200 rounded-lg shadow md:flex-col md:max-w-xl hover:bg-emerald-500 border-emerald-700 dark:bg-emerald-800 dark:hover:bg-emerald-700"
          >
            <img
              className="mt-6 object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
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
            {dog.user_id !== currentUser.id ? (
              <div className="buttons">
                <div className="mt-4 md:mt-0 md:ml-4">
                  <button type="button" className="dogs-index-btn">
                    Schedule Playdate
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <button onClick={() => openEditModal(dog)} type="button" className="dogs-index-btn">
                  Edit Pet
                </button>
                <button type="button" className="dogs-index-btn" onClick={() => handleRemoveDog(dog.id)}>
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
