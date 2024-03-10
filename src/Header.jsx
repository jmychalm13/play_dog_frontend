import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { LogoutLink } from "./LogoutLink";
import "./Header.css";

const id = localStorage.getItem("userId");

const navigation = [
  { name: "Playdates", to: "#" },
  { name: "Friends", to: "#" },
  { name: "Profile", to: `users/${id}` },
  { name: "Pets", to: "/dogs" },
  { name: "Users", to: "/users" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-screen bg-emerald-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {/* logo */}
            <img className="rounded-lg h-14 w-auto" src="/src/assets/logo-png.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-emerald-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} to={item.to} className="text-lg font-semibold leading-6 text-neutral-100">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {localStorage.getItem("jwt") === null ? (
            <Link to="/login" className="text-lg font-semibold leading-6 text-neutral-100">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          ) : (
            <LogoutLink />
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-emerald-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link to="#" className="-m-1.5 p-1.5">
              {/* classname sr-only is for screen reader */}
              <span className="sr-only">Your Company</span>
              {/* logo */}
              <img className="rounded-lg h-8 w-auto" src="src/assets/logo-png.png" alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-emerald-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {/* screen reader */}
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-emerald-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-100 hover:bg-emerald-800"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {localStorage.getItem("jwt") === null ? (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-neutral-100 hover:bg-emerald-800"
                  >
                    Log in
                  </Link>
                ) : (
                  <LogoutLink />
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
