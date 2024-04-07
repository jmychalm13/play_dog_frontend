/* eslint-disable react/prop-types */
import "./Modal.css";
import { Link } from "react-router-dom";

export function Modal(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
      if (value.trim() !== "") {
        formObject[key] = value;
      }
    });
    props.onUpdateUser(props.user.id, formObject);
    props.onClose();
    event.target.reset();
  };

  // eslint-disable-next-line react/prop-types
  if (props.show) {
    return (
      <div>
        <form
          className="border-zinc-900 rounded relative justify-center max-w-xl py-4 mx-auto bg-zinc-600 modal-main shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"
          onSubmit={handleSubmit}
        >
          <span
            onClick={props.onClose}
            className="absolute top-0 right-0 block w-10 h-5 -mt-2 -mr-4 text-xs text-center text-gray-600 transform rotate-45 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100"
          >
            close
          </span>
          <div className="user-modal-input relative w-full mb-5 group">
            <label htmlFor="image_url">Profile Image: </label>
            <input type="text" name="image_url" defaultValue={props.user.image_url} style={{ padding: "0.5rem" }} />
          </div>
          <div className="user-modal-input relative w-full mb-5 group">
            <label htmlFor="name">Username: </label>
            <input type="text" name="name" defaultValue={props.user.name} style={{ padding: "0.5rem" }} />
          </div>
          <div className="button">
            <button type="button" className="edit-user-btn">
              <Link to="/dogs/new">Add Pet</Link>
            </button>
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
}
