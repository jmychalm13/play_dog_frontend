/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";
import axios from "axios";

export function DogModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(props.dog.image_url);

  const handleSetFile = (event) => {
    if (event.target.files.length > 0) {
      setUploadedImg(event.target.files[0]);
      console.log(event.target.files[0]);
    } else {
      console.log("problem Houston");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    formData.append("image_url", uploadedImg);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    console.log("formObject", formObject);
    // axios request to update other fields
    axios
      .patch(`http://localhost:3000/dogs/${props.dog.id}.json`, formObject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("submit", response);
      });
  };

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
          <img src={props.dog.image_url} className="rounded-lg object-cover w-1/2 overflow-hidden" alt="" />
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
