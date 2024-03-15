import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog, faMagnet } from "@fortawesome/free-solid-svg-icons";

export function PlaydateNew() {
  const [currentUserDogs, setCurrentUserDogs] = useState([]);

  const getCurrentUserDogs = () => {
    const currentUserId = +localStorage.getItem("userId");
    axios.get(`http://localhost:3000/users/${currentUserId}.json`).then((response) => {
      setCurrentUserDogs(response.data.dogs);
      console.log(response.data.dogs);
    });
  };

  useEffect(getCurrentUserDogs, []);

  return (
    <div className="min-h-screen bg-neutral-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-tr from-lime-400 via-emerald-500 to-teal-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="text-white relative px-4 py-10 bg-emerald-400 shadow-lg sm:rounded-3xl sm:p-20">
          <div className="text-center pb-6">
            <h1 className="text-3xl">Schedule Playdate</h1>
          </div>
          <form>
            <input
              type="text"
              placeholder="field"
              name="test field"
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <div id="dog1Dropdown" className="flex justify-between">
              <Dropdown label={<FontAwesomeIcon icon={faDog} />} dismissOnClick={false}>
                {currentUserDogs.map((dog) => (
                  <Dropdown.Item key={dog.id}>{dog.name}</Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <p className="text-xl">
              <FontAwesomeIcon icon={faMagnet} />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
