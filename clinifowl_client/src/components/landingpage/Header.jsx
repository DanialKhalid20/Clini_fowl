import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-alabaster shadow-md">
      <div className="max-w-6xl flex items-center justify-between mx-auto p-2 md:p-4">
        <div className="flex items-center">
          <img
            src={logo}
            width={60} // Reduced size of the logo
            height={60} // Reduced size of the logo
            className="hidden md:block"
            alt="Clinifowl logo"
          />
          <Link to="/chatbot">
            <div className="text-black font-semibold text-2xl md:text-3xl ml-2">
              Clinifowl
            </div>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-primary items-center font-semibold text-lg">
          <Link to="/Landing">
            <div className="hover:underline">Home</div>
          </Link>
          <Link to="/detect">
            <div className="hover:underline">Detection</div>
          </Link>
          <Link to="/chatbot">
            <div className="hover:underline">Chatbot</div>
          </Link>
          <Link to="/nearbydoc">
            <div className="hover:underline">Nearby Vet</div>
          </Link>
          <Link to="/">
            <div className="bg-sienna text-white text-xl rounded-full px-4 py-1">
              Logout
            </div>
          </Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="flex flex-col bg-alabaster md:hidden text-primary font-semibold text-lg py-4">
          <Link to="/Landing" className="py-2 text-center" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/detect" className="py-2 text-center" onClick={toggleMenu}>
            Detection
          </Link>
          <Link to="/chatbot" className="py-2 text-center" onClick={toggleMenu}>
            Chatbot
          </Link>
          <Link
            to="/nearbydoc"
            className="py-2 text-center"
            onClick={toggleMenu}
          >
            Nearby Vet
          </Link>
          <Link to="/" className="py-2 text-center" onClick={toggleMenu}>
            <div className="bg-sienna text-white text-xl rounded-full px-4 py-1 inline-block hover:bg-sienna">
              Logout
            </div>
          </Link>
        </nav>
      )}
      <style jsx>{`
        .hover-bg-sienna:hover {
          background-color: #a0522d; /* Change this to the desired hover color */
        }
      `}</style>
    </header>
  );
};

export default Header;
