import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-700 text-white">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold font-heading">
            <img src="src/assets/logo-transparent-png.png" alt="" className="h-12" />
          </Link>
        </div>

        <div className="flex items-center">
          <ul
            className={`${
              isMobileMenuOpen ? "flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5" : "hidden"
            } md:flex md:space-x-5 font-semibold font-heading`}
          >
            <li>
              <Link className="hover:text-gray-200" to="#">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="#">
                Friends
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="#">
                Pups
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-200" to="#">
                Playdates
              </Link>
            </li>
          </ul>

          <div className="md:hidden ml-3">
            {/* Mobile menu button */}
            <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-5">
          <Link className="hover:text-gray-200">
            {/* Todo: put account icon from some icon library */}
            Account
          </Link>
        </div>
      </div>
    </nav>
  );
}
