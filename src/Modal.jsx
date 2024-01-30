/* eslint-disable react/prop-types */
import "./Modal.css";

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
      <div className="rounded relative justify-center max-w-xl py-4 mx-auto bg-white shadow-2xl">
        <span
          onClick={props.onClose}
          className="absolute top-0 right-0 block w-10 h-5 -mt-2 -mr-4 text-xs text-center text-gray-600 transform rotate-45 bg-white rounded shadow-md cursor-pointer hover:bg-gray-100"
        >
          close
        </span>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="image_url">Profile Image: </label>
            <input type="text" name="image_url" defaultValue={props.user.image_url} />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label htmlFor="image_url">Username: </label>
            <input type="text" name="name" defaultValue={props.user.name} />
          </div>
          <div className="button">
            <button className="border bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
              Add Pet
            </button>
          </div>
          <div className="button">
            <button
              className="border bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
        {/* <div className="w-1/2 ml-4 bg-cover">
          <img src={props.user.image_url} alt="" />
        </div>
        <div className="flex flex-col justify-between w-1/2 px-4 space-y-16">
          <div>
            <h1 className="mb-2 text-2xl font-bold leading-tight">{props.user.username}</h1>
            <p className="text-sm tes"></p>
          </div>
        </div> */}
      </div>
    );
  }
}
