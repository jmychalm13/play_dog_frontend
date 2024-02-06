import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function DogShow() {
  const params = useParams();
  const handleGetDog = () => {
    console.log(params);
  };

  useEffect(handleGetDog);

  return (
    <div className="h-full w-full">
      <p className="text-4xl">Here I am!!</p>
    </div>
  );
}
