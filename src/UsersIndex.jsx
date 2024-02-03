import axios from "axios";
import { useEffect, useState } from "react";

export function UsersIndex() {
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    axios.get("http://localhost:3000/users.json").then((response) => {
      setUsers(response.data);
    });
  };

  const addFriend = () => {
    console.log("Triggered");
  };

  useEffect(getAllUsers, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800">
      <h1 className="text-6xl text-center">Users</h1>
      <div className="cards grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-center p-5 bg-emerald-600 border border-gray-700 rounded-lg shadow-xl"
          >
            <div className="text-center max-w-screen-md">
              <img src={user.image_url} alt="profile pic" className="mx-auto w-24 h-24 mb-3 rounded-full shadow-lg" />
              <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-neutral-100">{user.name}</h5>
              <h5 className="text-3xl text-neutral-100 underline">Pets</h5>
              {user.dogs.map((dog) => (
                <div key={dog.id} className="text-neutral-100">
                  <p className="text-2xl">{dog.name}</p>
                  <p>{dog.breed}</p>
                  {dog.age < 1 ? <p>{dog.age} year old</p> : <p>{dog.age} years old</p>}
                </div>
              ))}
              <div className="flex mt-4 md:mt-6">
                <button
                  onClick={addFriend}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-stone-700 rounded-lg hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 dark:bg-stone-600 dark:hover:bg-stone-700 dark:focus:ring-stone-800"
                >
                  Add friend
                </button>
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-100 focus:ring-4 focus:outline-none focus:ring-stone-200 dark:bg-stone-800 dark:text-white dark:border-stone-600 dark:hover:bg-stone-700 dark:hover:border-stone-700 dark:focus:ring-stone-700 ms-3">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
