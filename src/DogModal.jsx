/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Modal.css";

export function DogModal(props) {
  const [behaviors, setBehaviors] = useState(props.dog.behaviors);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleBehaviorChange = (index, value) => {
    const updatedBehaviors = [...behaviors];
    updatedBehaviors[index].behavior = value;
    setBehaviors(updatedBehaviors);
  };

  console.log(props.dog.behaviors);

  useEffect(() => {
    setBehaviors([props.dog.behaviors]);
  }, [props.dog.behaviors]);

  return (
    <div className="modal-main">
      <form
        className="border rounded relative justify-center max-w-xl py-4 mx-auto bg-fuchsia-400 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <span
          onClick={props.onClose}
          className="absolute top-0 right-0 block w-10 h-5 -mt-2 -mr-4 text-xs text-center text-gray-600 transform rotate-45 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100"
        >
          close
        </span>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="image_url">Profile Image: </label>
          <input type="text" name="image_url" defaultValue={props.dog.image_url} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="name">Username: </label>
          <input type="text" name="name" defaultValue={props.dog.name} />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label htmlFor="breed">Breed: </label>
          <input type="text" name="breed" defaultValue={props.dog.breed} />
        </div>
        <label htmlFor="behaviors">Behaviors:</label>
        {/* todo behaviors */}
        {behaviors.map((behavior, index) => (
          <div key={index} className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={behavior.behavior}
              onChange={(e) => handleBehaviorChange(index, e.target.value)}
            />
          </div>
        ))}
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
