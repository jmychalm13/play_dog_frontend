/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Modal.css";
import { TrashIcon, PencilSquareIcon, DocumentCheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function DogModal(props) {
  const [behaviors, setBehaviors] = useState(props.dog.behaviors);
  const [editableIndex, setEditableIndex] = useState(null);
  const [newBehavior, setNewBehavior] = useState("");

  const handleSave = (behavior) => {
    behavior.behavior = newBehavior;
    setEditableIndex(null);
    const params = {
      behavior: newBehavior,
    };
    axios.patch(`http://localhost:3000/behaviors/${behavior.id}.json`, params).then((response) => {
      console.log(response);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    // axios request to update other fields
    axios.patch(`http://localhost:3000/dogs/${props.dog.id}.json`, formObject).then((response) => {
      console.log(response);
    });
  };

  const handleDelete = (index, behaviorId) => {
    axios.delete(`http://localhost:3000/behaviors/${behaviorId}.json`).then((response) => {
      console.log(response);
      setBehaviors(behaviors.filter((behavior) => behavior.id !== behaviorId));
    });
  };

  const handleEdit = (index, behavior) => {
    setEditableIndex(index);
    setNewBehavior(behavior);
  };

  const handleInputChange = (behavior) => {
    setNewBehavior(behavior);
  };

  const handleCancelEdit = () => {
    setEditableIndex(null);
  };

  return (
    <div className="modal-main">
      <form
        className="border rounded relative justify-center max-w-xl py-4 mx-auto bg-fuchsia-400 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <span
          onClick={() => props.onClose({})}
          className="absolute top-0 right-0 block w-10 h-5 -mt-2 -mr-4 text-xs text-center text-gray-600 transform rotate-45 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100"
        >
          close
        </span>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="image_url">Profile Image: </label>
          <input type="text" name="image_url" defaultValue={props.dog.image_url} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" defaultValue={props.dog.name} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Breed: </label>
          <input type="text" name="breed" defaultValue={props.dog.breed} />
        </div>
        <label htmlFor="behaviors">Behaviors:</label>
        <ul>
          {behaviors.map((behavior, index) => (
            <li key={index} className="grid grid-cols-2">
              {editableIndex == null || editableIndex !== index ? (
                // Non-edit mode: Render behavior text
                <>
                  <div>{behavior.behavior}</div>
                  <div className="flex">
                    <button onClick={() => handleDelete(index, behavior.id)}>
                      <TrashIcon className="h-6 w-6 text-blue-500" />
                    </button>
                    <button onClick={() => handleEdit(index, behavior.behavior)}>
                      <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                    </button>
                  </div>
                </>
              ) : (
                // Edit mode: Render input field
                <div className="grid grid-cols-2">
                  <input
                    type="text"
                    value={newBehavior}
                    className="m-1"
                    onChange={(event) => handleInputChange(event.target.value)}
                  />
                  <div className="flex">
                    <button onClick={() => handleSave(behavior)}>
                      <DocumentCheckIcon className="h-6 w-6 text-blue-500" />
                    </button>
                    <button onClick={handleCancelEdit}>
                      <XCircleIcon className="h-6 w-6 text-blue-500" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="button">
          <button
            className="border bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
