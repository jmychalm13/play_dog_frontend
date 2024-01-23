import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function UserShow() {
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();

  const handleGetUser = () => {
    axios.get(`http://localhost:3000/users/${params.id}.json`).then((response) => {
      console.log(response.data.dogs);
      setUserInfo(response.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleGetUser, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800 bg-cover bg-center h-screen">
      <h1 className="text-3xl text-center">Profile</h1>
      <div className="flex justify-center">
        <div className="shadow-lg rounded-lg overflow-hidden w-1/4">
          <h3 className="text-xl">
            Username: <span className="text-large">{userInfo.name}</span>
          </h3>
          <img className="w-full" src={userInfo.image_url} alt="" />
        </div>
      </div>
      <h2 className="text-center text-2xl underline">Dogs</h2>
      <div className="dog-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userInfo &&
          userInfo.dogs &&
          userInfo.dogs.map((dog) => (
            <div className="flex justify-center" key={dog.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden w-1/4">
                <img className="w-full object-cover object-center" src={dog.image_url} alt="" />
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.name}</h2>
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.age}</h2>
                </div>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  More Info
                </button>
              </div>
            </div>
          ))}
      </div>
      <button
        type="button"
        className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Edit
      </button>
    </section>
  );
}
