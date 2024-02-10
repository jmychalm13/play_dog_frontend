import axios from "axios";
import { Link } from "react-router-dom";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <Link
      className="mx-3 block rounded-lg px-3 py-2.5 text-base text-lg font-semibold leading-7 text-neutral-100 hover:bg-emerald-800"
      to="#"
      onClick={handleClick}
    >
      Logout
    </Link>
  );
}
