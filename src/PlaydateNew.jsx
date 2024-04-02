import { BulletSelectList } from "./BulletSelectList";
import { useEffect, useState } from "react";
import axios from "axios";

export function PlaydateNew() {
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState(null);
  const [userDogs, setUserDogs] = useState([]);

  const friendDogIds = [];
  const getUserDogs = () => {
    const currentUser = +localStorage.getItem("userId");
    axios.get(`http://localhost:3000/users/${currentUser}.json`).then((response) => {
      setUserDogs(response.data.dogs);
      response.data.friendships.forEach((friendship) => {
        friendDogIds.push(friendship.friend_id);
      });
    });
  };

  const getFriendsDogs = () => {
    const friendDogsArray = [];
    axios.get("http://localhost:3000/dogs.json").then((response) => {
      console.log("friendDogIds:", friendDogIds);
      response.data.forEach((dog) => {
        if (friendDogIds.includes(dog.user_id)) {
          friendDogsArray.push(dog);
        }
      });
    });
    console.log("friendDogsArray:", friendDogsArray);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected Option:", option);
  };

  useEffect(getUserDogs, []);
  useEffect(getFriendsDogs, []);

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
            <div>
              <h1>Select your pet:</h1>
              <BulletSelectList options={userDogs} onSelect={handleSelect} />
            </div>
            <div>
              <p>Is going on a date with...</p>
            </div>
            <div>
              <h1>Select your friend&apos;s dog</h1>
              <BulletSelectList options={userDogs} onSelect={handleSelect} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
