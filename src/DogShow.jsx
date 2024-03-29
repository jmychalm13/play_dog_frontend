import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DogModal } from "./DogModal";
import "./DogShow.css";

export function DogShow() {
  const [dogInfo, setDogInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const { id } = useParams();

  const getDogInfo = () => {
    const userId = +localStorage.getItem("userId");
    axios.get(`http://localhost:3000/dogs/${id}.json`).then((response) => {
      setDogInfo(response.data);
      if (response.data.user_id === userId) {
        setIsLoggedIn(true);
      }
    });
  };

  const openEditModal = () => {
    setIsEditModalVisible(true);
  };

  const handleHideEditModal = () => {
    if (dogInfo) {
      getDogInfo();
    }
    setIsEditModalVisible(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getDogInfo, []);

  return (
    <section className="grid place-items-center h-screen w-screen bg-gradient-to-b from-violet-300 via-purple-300 to-fuchsia-300">
      <p className="text-fuchsia-900 name text-4xl text-center">{dogInfo.name}</p>
      <div className="border-fuchsia-900 w-2/3 flex shadow-lg justify-center p-4">
        <div className="w-1/3">
          <img className="h-auto max-w-full rounded-lg" src={dogInfo.image_url} alt="image description" />
          <div className="info">
            <p>
              {dogInfo.name} is a {dogInfo.age} year old {dogInfo.breed}.
            </p>
            <p>These are some of {dogInfo.name}&apos;s characteristics:</p>
            <div>
              <ul className="list-disc list-inside">
                {dogInfo &&
                  dogInfo.behaviors &&
                  dogInfo.behaviors.map((behavior) => <li key={behavior.id}>{behavior.behavior}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {!isEditModalVisible ? (
        <div className="bg-fuchsia-900 text-white p-2 rounded-lg shadow-lg border-fuchsia-900 buttons">
          {isLoggedIn ? <button onClick={openEditModal}>Edit Pup</button> : <button>Schedule Playdate</button>}
        </div>
      ) : null}
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
    </section>
  );
}
