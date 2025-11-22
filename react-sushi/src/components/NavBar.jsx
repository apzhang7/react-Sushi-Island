import { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-rose-900 text-black px-6 py-4 shadow-md">
      <nav className="flex justify-between items-center max-w-8xl mx-auto">

        {/* Logo */}
        <div className="text-2xl font-bold whitespace-nowrap">
          Sushi Island
        </div>

        {/* Hamburger for mobile */}
        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          ☰
        </div>

        {/* Desktop / Mobile Nav Links */}
        <ul
          className={`md:flex md:gap-8 text-lg md:items-center ${
            open
              ? "flex flex-col gap-4 absolute top-16 left-0 bg-rose-900 w-full px-6 py-4 md:static md:flex-row"
              : "hidden md:flex"
          }`}
        >
          <li className="text-white"><Link to="/" className="hover:text-gray-400">Home</Link></li>
          <li className="text-white"><Link to="/menu" className="hover:text-gray-400">Menu</Link></li>
          <li className="text-white"><Link to="/about" className="hover:text-gray-400">About</Link></li>
          <li className="text-white"><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
