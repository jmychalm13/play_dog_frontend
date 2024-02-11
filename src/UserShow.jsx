import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { EditUserModal } from "./EditUserModal";
// import "./Modal.css";

export function UserShow() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFriends, setCurrentFriends] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pendingFriends, setPendingFriends] = useState([]);

  const handleGetUser = () => {
    axios.get(`http://localhost:3000/users/${localStorage.getItem("userId")}.json`).then((response) => {
      setUserInfo(response.data);
      console.log("user info: ", response.data);
    });
  };

  const openModal = () => setIsModalVisible(true);

  const handleHideModal = () => {
    setIsModalVisible(false);
  };

  const onUpdateUser = (id, formData) => {
    axios.patch(`http://localhost:3000/users/${id}.json`, formData).then((response) => {
      console.log(response);
    });
  };

  const getAllFriendships = () => {
    axios.get("http://localhost:3000/friendships.json").then((response) => {
      const data = response.data;
      let friends = [];
      let pending = [];
      data.forEach((friend) => {
        console.log("friends:", friend);
        if (friend.status) {
          friends.push(friend.friend_id);
        } else {
          pending.push(friend.friend_id);
        }
      });
      setCurrentFriends(friends);
      setPendingFriends(pending);
    });
  };

  const acceptFriendRequest = (id) => {
    const params = {
      status: true,
    };
    axios.patch(`http://localhost:3000/friendships/${id}.json`, params).then((response) => {
      console.log(response.data);
      setCurrentFriends([...currentFriends, response.data.friend_id]);
    });
  };

  useEffect(() => {
    handleGetUser();
    getAllFriendships();
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800 bg-cover bg-center h-full">
      <h1 className="text-3xl text-center">{userInfo.name}</h1>
      <div className="flex justify-center">
        <div className="shadow-lg rounded-lg overflow-hidden w-1/4">
          <img className="w-full" src={userInfo.image_url} alt="" />
        </div>
      </div>
      <p className="my-10 text-2xl text-center underline">Friend Requests</p>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4 w-full">
          {userInfo &&
            userInfo.friendships &&
            userInfo.friendships.map((friendship) => (
              <div
                key={friendship.id}
                className="request-card border rounded-lg shadow-lg border-emerald-900 bg-neutral-400 flex flex-col items-center pb-10"
              >
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={friendship.friend_image}
                  alt="profile pic"
                />
                <p className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{friendship.friend_name}</p>
                <div className="w-24 h-24 mb-3">
                  {!friendship.status && !currentFriends.includes(friendship.friend_id) ? (
                    <div>
                      <button
                        onClick={() => acceptFriendRequest(friendship.id)}
                        type="button"
                        className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                      >
                        Accept Request
                      </button>
                    </div>
                  ) : (
                    <div className="border rounded-lg border-emerald-900 text-emerald-900 flex items-center">
                      <p className="flex items-center">
                        Friends
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="my-12">
        <h2 className="text-center text-2xl underline">Dogs</h2>
      </div>
      <div className="dog-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userInfo &&
          userInfo.dogs &&
          userInfo.dogs.map((dog) => (
            <div className="card flex justify-center" key={dog.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden w-3/5">
                <img className="w-full" src={dog.image_url} alt="" />
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.name}</h2>
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.age}</h2>
                </div>
                <div className="flex justify-center">
                  <Link
                    to={`/dogs/${dog.id}`}
                    className="text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:focus:ring-emerald-800 shadow-lg shadow-emerald-500/50 dark:shadow-lg dark:shadow-emerald-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full flex justify-center">
        {!isModalVisible ? (
          <button
            type="button"
            className="my-12 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={openModal}
          >
            Edit Profile
          </button>
        ) : null}
        {isModalVisible && (
          <div className="overlay">
            <Modal show={isModalVisible} onClose={handleHideModal} user={userInfo} onUpdateUser={onUpdateUser}>
              <EditUserModal closeModal={handleHideModal} />
            </Modal>
          </div>
        )}
      </div>
    </section>
  );
}
