/* eslint-disable react/prop-types */
import { HeartIcon } from "@heroicons/react/24/solid";

export function FriendRequests(props) {
  return (
    <div>
      <p className="my-10 text-2xl text-center profile-heading">Friend Requests</p>
      <div className="px-5 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full justify-center">
          {props.userInfo &&
            props.userInfo.friendships &&
            props.userInfo.friendships.map((friendship) => (
              <div key={friendship.id} className="p-5 request-card border-2 border-slate-900">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]"
                  src={friendship.friend_image}
                  alt="profile pic"
                />
                <p className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{friendship.friend_name}</p>
                <div className="w-24 h-24 mb-3">
                  {!friendship.status && !props.currentFriends.includes(friendship.friend_id) ? (
                    <div>
                      <button
                        onClick={() => props.acceptFriendRequest(friendship.id)}
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
  );
}
