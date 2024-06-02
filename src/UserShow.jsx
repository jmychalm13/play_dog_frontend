/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "./UserModal";
import { useParams } from "react-router-dom";
import { DogModal } from "./DogModal";
import { FriendRequests } from "./FriendRequests";

export function UserShow() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFriends, setCurrentFriends] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pendingFriends, setPendingFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(+localStorage.getItem("userId"));
  const [isDogModalVisible, setIsDogModalVisible] = useState(false);
  const [dogInfo, setDogInfo] = useState({});
  const [refresh, setRefresh] = useState(false);

  const { id } = useParams();

  const handleGetUser = () => {
    axios.get(`http://localhost:3000/users/${id}.json`).then((response) => {
      setUserInfo(response.data);
    });
  };

  const openModal = () => setIsModalVisible(true);

  const handleHideModal = () => setIsModalVisible(false);

  const openDogModal = (dogId) => {
    const dog = userInfo.dogs.find((dog) => dog.id === dogId);
    if (dog) {
      setDogInfo(dog);
      setIsDogModalVisible(true);
      console.log(`dog coming from props: ${dog}`);
    }
  };

  const handleHideDogModal = () => {
    setIsDogModalVisible(false);
    setDogInfo({});
    setRefresh((prev) => !prev);
  };

  const onUpdateUser = (id, formData) => {
    axios.patch(`http://localhost:3000/users/${id}.json`, formData).then((response) => {
      console.log(response);
      handleGetUser();
    });
  };

  const getAllFriendships = () => {
    axios.get("http://localhost:3000/friendships.json").then((response) => {
      const data = response.data;
      let friends = [];
      let pending = [];
      data.forEach((friend) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return (
    <section className="bg-gradient-to-b from-zinc-800 to-green-800 bg-cover bg-center h-full p-5 text-white">
      <h1 className="profile-heading-username pb-5 text-3xl text-center">{userInfo.name}</h1>
      <div className="flex justify-center">
        <div className="shadow-lg rounded-lg overflow-hidden w-1/4 border border-slate-900">
          <img className="w-full" src={userInfo.image_url} alt="" />
        </div>
      </div>
      <FriendRequests
        userInfo={userInfo}
        currentFriends={currentFriends}
        pendingFriends={pendingFriends}
        acceptFriendRequest={acceptFriendRequest}
      />
      <div className="my-12">
        <h2 className="text-center text-2xl profile-heading">Dogs</h2>
      </div>
      <div className="dog-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {userInfo &&
          userInfo.dogs &&
          userInfo.dogs.map((dog) => (
            <div className="card flex justify-center" key={dog.id}>
              <div className="bg-neutral-300 rounded-lg overflow-hidden w-3/5 border-2 border-slate-900 ">
                <img className="object-cover w-full overflow-hidden" src={dog.image_url} alt="" />
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.name}</h2>
                  <h2 className="text-gray-800 text-lg font-semibold">{dog.age}</h2>
                </div>
                <div className="flex justify-center">
                  {!isDogModalVisible ? (
                    <button type="button" className="friend-btn" onClick={() => openDogModal(dog.id)}>
                      More Info
                    </button>
                  ) : null}
                  {isDogModalVisible && dogInfo.id === dog.id && (
                    <div className="overlay">
                      <DogModal
                        show={openDogModal}
                        closeModal={handleHideDogModal}
                        onClose={handleHideDogModal}
                        dog={dog}
                      ></DogModal>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        <div className="add-dog-card flex justify-center">
          <div className="bg-neutral-300 rounded-lg overflow-hidden w-3/5 border-2 border-slate-900 ">
            <Link to="/dogs/new">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#064E3B"
                className="size-37"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h2 className="text-center text-gray-800 text-lg font-bold">Add Pet</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        {currentUser === userInfo.id ? (
          <div>
            {!isModalVisible ? (
              <button type="button" className="mt-12 friend-btn" onClick={openModal}>
                Edit Profile
              </button>
            ) : null}
            {isModalVisible && (
              <div className="overlay">
                <Modal
                  show={isModalVisible}
                  onClose={handleHideModal}
                  user={userInfo}
                  onUpdateUser={onUpdateUser}
                ></Modal>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button type="button" className="modal-btn">
              <Link to="/playdates/new">Schedule Playdate</Link>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
