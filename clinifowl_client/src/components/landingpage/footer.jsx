import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-alabaster py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-8 lg:px-0 flex flex-col lg:flex-row justify-between items-center">
        <div className="mb-4 lg:mb-0">
          <h2 className="text-xl text-black font-bold mb-2">Get in Touch</h2>
          <p className="text-black">clinifowl@gmail.com</p>
        </div>
        <div className="flex space-x-10">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <FaInstagram className="text-2xl text-black hover:text-gray-300" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
            <FaFacebookF className="text-2xl text-black hover:text-gray-300" />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <RiTwitterXFill className="text-2xl text-black hover:text-gray-300" />
          </a>
        </div>
        <div className="text-right text-black">
          <p>Clinifowl &copy; 2024</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-8 lg:px-0 flex justify-center mt-4">
        <nav className="flex space-x-6">
          <Link to="/" className="text-black hover:text-gray-300 cursor-pointer">Home</Link>
          <Link to="/detect" className="text-black hover:text-gray-300 cursor-pointer">Detection</Link>
          <Link to="/chatbot" className="text-black hover:text-gray-300 cursor-pointer">Chatbot</Link>
          <Link to="/nearby" className="text-black hover:text-gray-300 cursor-pointer">Nearby Vet</Link>
        </nav>
      </div>
      <style jsx>{`
        .cursor-pointer:hover {
          cursor:  alabaster;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
