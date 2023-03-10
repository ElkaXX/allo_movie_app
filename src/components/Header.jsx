import React from "react";
import { NavLink } from "react-router-dom";

const activeStyle = {
  borderBottom: "2px solid #dc2626",
  paddingBottom: "5px",
};

const pages = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Favorite",
    path: "/favorite",
  },
];

function Header() {
  return (
    <header className="bg-zinc-800 sticky top-0 z-1">
      <nav className="container mx-auto max-w-5xl py-2">
        <ul className="flex flex-start items-center">
          <li>
            <NavLink to="/" className="mr-4 text-white text-lg tracking-widest">
              Allo <span className="text-red-600">Movie</span>
            </NavLink>
          </li>
          {pages.map((page) => (
            <li key={page.name} className="ml-2">
              <NavLink
                to={page.path}
                className="text-white"
                style={({ isActive }) => (isActive ? activeStyle : null)}
              >
                {page.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
