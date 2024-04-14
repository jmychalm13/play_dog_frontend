/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "./UserModal";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { DogModal } from "./DogModal";

export function UserShow() {
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFriends, setCurrentFriends] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [pendingFriends, setPendingFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState(+localStorage.getItem("userId"));
  const [isDogModalVisible, setIsDogModalVisible] = useState(false);
  const [dogInfo, setDogInfo] = useState({});

  const { id } = useParams();

  const handleGetUser = () => {
    axios.get(`http://localhost:3000/users/${id}.json`).then((response) => {
      setUserInfo(response.data);
      console.log(response.data);
    });
  };

  const openModal = () => setIsModalVisible(true);

  const handleHideModal = () => setIsModalVisible(false);

  const openDogModal = (dog) => {
    setDogInfo(dog);
    setIsDogModalVisible(true);
  };

  const handleHideDogModal = () => setIsDogModalVisible(false);

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
  }, []);

  return (
    <section className="bg-gradient-to-b from-zinc-800 to-green-800 bg-cover bg-center h-full p-5 text-white">
      <h1 className="profile-heading-username pb-5 text-3xl text-center">{userInfo.name}</h1>
      <div className="flex justify-center">
        <div className="shadow-lg rounded-lg overflow-hidden w-1/4 border border-slate-900">
          <img className="w-full" src={userInfo.image_url} alt="" />
        </div>
      </div>
      {currentFriends.length !== 0 && pendingFriends.length !== 0 ? (
        <div>
          <p className="my-10 text-2xl text-center profile-heading">Friend Requests</p>
          <div className="px-5 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full justify-center">
              {userInfo &&
                userInfo.friendships &&
                userInfo.friendships.map((friendship) => (
                  <div key={friendship.id} className="p-5 request-card border-2 border-slate-900">
                    <img
                      className="w-24 h-24 mb-3 rounded-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
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
                            className="friend-btn"
                          >
                            Accept Request
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 rounded-lg border-emerald-900 text-emerald-900 flex items-center justify-center">
                          <p className="flex items-center text-center">
                            Friends
                            <HeartIcon className="w-6 h-6 text-emerald-900" />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
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
                    <button type="button" className="friend-btn" onClick={() => openDogModal(dog)}>
                      More Info
                    </button>
                  ) : null}
                  {isDogModalVisible && (
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
