import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function DogShow() {
  const [dogInfo, setDogInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getDogInfo, []);

  return (
    <section className="h-screen w-screen bg-gradient-to-b from-violet-300 via-purple-300 to-fuchsia-300">
      <p className="py-3 text-4xl text-center">{dogInfo.name}</p>
      <div className="grid place-items-center">
        <img className="h-auto max-w-full rounded-lg" src={dogInfo.image_url} alt="image description" />
        <figcaption className="mt-2 text-md text-center text-gray-500 dark:text-gray-400">
          {dogInfo.age} years old
        </figcaption>
        <figcaption className="mt-2 text-md text-center text-gray-500 dark:text-gray-400">{dogInfo.breed}</figcaption>
      </div>
      <div className="info">
        <p>
          {dogInfo.name} is a {dogInfo.age} year old {dogInfo.breed}.
        </p>
        <p>These are some of {dogInfo.name}&apos;s most common characteristics:</p>
        <div>
          <ul className="list-disc list-inside">
            {dogInfo &&
              dogInfo.behaviors &&
              dogInfo.behaviors.map((behavior) => <li key={behavior.id}>{behavior.behavior}</li>)}
          </ul>
        </div>
      </div>
      <div className="buttons">{isLoggedIn ? <button>Edit Pup</button> : <button>Schedule Playdate</button>}</div>
    </section>
  );
}
