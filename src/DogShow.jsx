import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function DogShow() {
  const [dogInfo, setDogInfo] = useState({});

  const { id } = useParams();

  const getDogInfo = () => {
    axios.get(`http://localhost:3000/dogs/${id}.json`).then((response) => {
      setDogInfo(response.data);
    });
  };

  useEffect(getDogInfo, []);

  return (
    <section className="h-screen w-screen bg-gradient-to-b from-violet-300 via-purple-300 to-fuchsia-300">
      <p className="text-4xl">{dogInfo.name}</p>
      <img src={dogInfo.image_url} alt="" />
      <p className="text-2xl">{dogInfo.breed}</p>
    </section>
  );
}
