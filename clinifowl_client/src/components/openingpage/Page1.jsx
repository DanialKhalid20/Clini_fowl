import Typewriter from "typewriter-effect";
import img1 from "../../assets/logo.png";
import { Link } from "react-router-dom";
import React, { useEffect } from 'react';

function Typewriterr() {
  return (
    <h1 className="text-center md:text-left md:ml-10">
      {/* Center the text for small screens, left-align for medium and larger screens, with left gap for medium and larger screens */}
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 90,
          strings: [
            "Welcome to Clinifowl",
            "Detect diseases using fecal images",
            "Chatbot for disease diagnosis",
            "Check Veterinary doctors near you",
          ],
        }}
      />
    </h1>
  );
}

export default function Page1() {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-alabaster">
      <div className="flex justify-center items-center">
        {/* Center the content */}
        <div className="flex-grow">
          <div className="flex items-center justify-center mb-20 mr-8">
            {" "}
            {/* Align items and justify content center */}
            <img className="imag1 max-w-60 max-h-60" src={img1} alt="Logo" />
            <h1 className="text-5xl text-black font-bold">Clinifowl</h1>{" "}
            {/* Add ml-4 for spacing */}
          </div>
          <div className="text-3xl text-sienna ml-8 mb-40 font-semibold">
            <Typewriterr />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center bg-dutchwhite">
        {/* Center the content */}
        <div className="flex-grow">
          <div>
            <h2 className="text-5xl font-bold text-center text-black mb-10">
              Get Started
            </h2>
            {/* Center the text for small screens, left-align for medium and larger screens */}
          </div>
          <div className="mt-8 flex justify-center mb-10">
            {/* Center the buttons for small screens, left-align for medium and larger screens */}
            <Link to="/Loginpage">
              <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 w-30">
                <h4 className="text-3xl font-semibold">Log in</h4>
              </button>
            </Link>
            <Link to="/Signuppage">
              <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 ml-4 w-30 ">
                <h4 className="text-3xl font-semibold">Sign up</h4>
              </button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 right-5  py-4">
          <p className="text-black font-semibold"> Clinifowl &copy; 2024 </p>
        </div>
      </div>
    </div>
  );
}
