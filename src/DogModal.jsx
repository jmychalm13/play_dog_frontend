/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
import { BehaviorList } from "./BehaviorList";

export function DogModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [isUploading, setIsUploading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(props.dog.image_url);
  const [dogData, setDogData] = useState({
    name: props.dog.name,
    breed: props.dog.breed,
    behaviors: props.dog.behaviors,
  });

  // console.log("behaviors", props.dog.behaviors[0]["rating"]);

  const handleSetFile = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadedImg(URL.createObjectURL(event.target.files[0]));
      console.log("Selected file:", event.target.files[0]);
    } else {
      console.log("problem Houston");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (selectedFile) {
      formData.append("dog[image_url]", selectedFile);
    } else {
      formData.append("dog[image_url]", props.dog.image_url);
    }
    formData.append("dog[name]", event.target.name.value);
    formData.append("dog[breed]", event.target.breed.value);
    // formData.append("behaviors", event.target.behaviors.value);
    axios
      .patch(`http://localhost:3000/dogs/${props.dog.id}.json`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("submit", response);
        props.onClose();
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDogData({ ...dogData, [name]: value });
  };

  useEffect(() => {
    setUploadedImg(props.dog.image_url);
    setSelectedFile(null);
    setDogData({
      name: props.dog.name,
      breed: props.dog.breed,
      behaviors: props.dog.behaviors,
    });
  }, [props.dog]);

  return (
    <div className="dog-modal-input modal-main">
      <form
        className="p-5 border rounded relative justify-center max-w-xl py-4 mx-auto bg-gradient-to-t from-slate-300 to-slate-500 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <span
          onClick={() => props.onClose({})}
          className="absolute top-0 right-0 block w-10 h-5 -mt-2 -mr-4 text-xs text-center text-gray-600 transform rotate-45 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100"
        >
          close
        </span>
        <div className="flex justify-center items-center">
          <img src={uploadedImg} className="rounded-lg object-cover w-1/2 overflow-hidden" alt="" />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="image_url">Profile Image: </label>
          <input
            type="file"
            className="focus:outline-none focus:ring-0 focus:ring-gray-700 mt-1 p-2 w-full rounded-md bg-emerald-800 text-white"
            onChange={handleSetFile}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name">Name: </label>
          <input
            className="rounded-lg shadow-lg"
            type="text"
            name="name"
            defaultValue={props.dog.name}
            onChange={handleChange}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Breed: </label>
          <input
            className="rounded-lg shadow-lg"
            type="text"
            name="breed"
            defaultValue={props.dog.breed}
            onChange={handleChange}
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <p className="text-center">Behaviors:</p>
          <BehaviorList behaviors={props.dog.behaviors} />
        </div>
        <div className="button">
          <button className="edit-user-btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
