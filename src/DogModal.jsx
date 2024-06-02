/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";

export function DogModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [isUploading, setIsUploading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(props.dog.image_url);
  const [dogData, setDogData] = useState({
    name: props.dog.name,
    breed: props.dog.breed,
    behaviors: props.dog.behaviors,
  });
  console.log("props", props.dog);

  const handleSetFile = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadedImg(URL.createObjectURL(event.target.files[0])); // Show the preview of the selected image
      console.log("Selected file:", event.target.files[0]);
    } else {
      console.log("problem Houston");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    if (selectedFile) {
      formData.append("image_url", selectedFile);
    }
    formData.append("name", event.target.name.value);
    formData.append("breed", event.target.breed.value);
    // formData.append("behaviors", event.target.behaviors.value);
    console.log("formData", formData);
    axios
      .patch(`http://localhost:3000/dogs/${props.dog.id}.json`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("submit", response);
      });
  };

  useEffect(() => {
    setUploadedImg(props.dog.image_url);
    setSelectedFile(null);
    console.log("Dog Prop in Dog Modal" + props.dog);
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
            required
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name">Name: </label>
          <input className="rounded-lg shadow-lg" type="text" name="name" defaultValue={props.dog.name} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Breed: </label>
          <input className="rounded-lg shadow-lg" type="text" name="breed" defaultValue={props.dog.breed} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Behaviors: </label>
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
