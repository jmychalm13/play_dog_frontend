import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function UserShow() {
  const [userInfo, setUserInfo] = useState({});
  const params = useParams();

  const handleGetUser = () => {
    axios.get(`http://localhost:3000/users/${params.id}.json`).then((response) => {
      console.log(response.data);
      setUserInfo(response.data);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleGetUser, []);

  return (
    <section className="bg-gradient-to-b from-gray-300 to-green-800 bg-cover bg-center h-screen">
      <h1 className="text-3xl text-center">Profile</h1>
      <h3 className="text-xl">{userInfo.name}</h3>
      <img src={userInfo.image_url} alt="" />
    </section>
  );
}
