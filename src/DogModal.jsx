/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./Modal.css";
import { TrashIcon, PencilSquareIcon, DocumentCheckIcon, XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export function DogModal(props) {
  const [behaviors, setBehaviors] = useState(props.dog.behaviors);
  const [editableIndex, setEditableIndex] = useState(null);
  const [newBehavior, setNewBehavior] = useState("");
  const [addBehavior, setAddBehavior] = useState(false);
  const [additionalBehavior, setAdditionalBehavior] = useState("");

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
      console.log("submit", response);
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

  const setIsInputVisible = () => {
    setAddBehavior(true);
  };

  const handleCancelAddBehavior = () => {
    setAddBehavior(false);
  };

  const handleAddBehaviorInput = (behavior) => {
    setAdditionalBehavior(behavior);
  };

  const handleAddBehaviorToDatabase = () => {
    console.log("behaviors before update:", behaviors);
    console.log(additionalBehavior);
    const params = {
      behavior: additionalBehavior,
      dog_id: props.dog.id,
    };
    axios
      .post("http://localhost:3000/behaviors.json", params)
      .then((response) => {
        console.log("response", response);
        setBehaviors([...behaviors, response.data]);
        setAddBehavior(false);

        console.log("behaviors after update:", behaviors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (addBehavior) {
      const inputElement = document.getElementById("newBehaviorInput");
      if (inputElement) {
        console.log("inputRef found");
        inputElement.focus();
      } else {
        console.log("input ref is still undefined");
      }
    }
  }, [addBehavior]);

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
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="image_url">Profile Image: </label>
          <input className="rounded-lg shadow-lg" type="text" name="image_url" defaultValue={props.dog.image_url} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name">Name: </label>
          <input className="rounded-lg shadow-lg" type="text" name="name" defaultValue={props.dog.name} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Breed: </label>
          <input className="rounded-lg shadow-lg" type="text" name="breed" defaultValue={props.dog.breed} />
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
                    <button type="button" onClick={() => handleDelete(index, behavior.id)}>
                      <TrashIcon className="h-6 w-6 text-emerald-500" />
                    </button>
                    <button type="button" onClick={() => handleEdit(index, behavior.behavior)}>
                      <PencilSquareIcon className="h-6 w-6 text-emerald-500" />
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
                    <button type="button" onClick={() => handleSave(behavior)}>
                      <DocumentCheckIcon className="h-6 w-6 text-emerald-500" />
                    </button>
                    <button type="button" onClick={handleCancelEdit}>
                      <XCircleIcon className="h-6 w-6 text-emerald-500" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
          {!addBehavior ? (
            <li className="grid grid-cols-2">
              <div>Add Behavior</div>
              <div className="">
                <button type="button" onClick={setIsInputVisible}>
                  <PlusIcon className="h-6 w-6 text-emerald-500" />
                </button>
              </div>
            </li>
          ) : (
            <li className="grid grid-cols-2">
              <input
                id="newBehaviorInput"
                type="text"
                name="behavior"
                className="m-1"
                onChange={(event) => handleAddBehaviorInput(event.target.value)}
              />
              <div className="flex">
                <div>
                  <button type="button" onClick={handleAddBehaviorToDatabase}>
                    <DocumentCheckIcon className="h-6 w-6 text-emerald-500" />
                  </button>
                  <button type="button" onClick={handleCancelAddBehavior}>
                    <XCircleIcon className="h-6 w-6 text-emerald-500" />
                  </button>
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className="button">
          <button className="edit-user-btn" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
