import Typewriter from "typewriter-effect";
import img1 from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function Typewriterr() {
  return (
    <h1 className="text-center">
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
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="min-h-screen bg-alabaster">
      {isLg ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex justify-center items-center">
            <div className="flex-grow">
              <div className="flex items-center justify-center mb-20 mr-8">
                <img
                  className="imag1 max-w-60 max-h-60"
                  src={img1}
                  alt="Logo"
                />
                <h1 className="text-5xl text-black font-bold ml-4">
                  Clinifowl
                </h1>
              </div>
              <div className="text-3xl text-sienna ml-8 mb-40 font-semibold">
                <Typewriterr />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center bg-dutchwhite">
            <div className="flex-grow">
              <div>
                <h2 className="text-5xl font-bold text-center text-black mb-10">
                  Get Started
                </h2>
              </div>
              <div className="mt-8 flex justify-center mb-10 space-x-4">
                <Link to="/Loginpage">
                  <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 w-40">
                    <h4 className="text-3xl font-semibold">Log in</h4>
                  </button>
                </Link>
                <Link to="/Signuppage">
                  <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 w-40">
                    <h4 className="text-3xl font-semibold">Sign up</h4>
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute bottom-0 right-5 py-4">
              <p className="text-black font-semibold">Clinifowl &copy; 2024</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-between max-h-screen">
          <div className="flex flex-col items-center">
            <img className="max-w-60 max-h-60 " src={img1} alt="Logo" />
            <h1 className="text-5xl text-black font-bold mb-10">Clinifowl</h1>
          </div>
          <div className="flex space-x-4 max-w-96">
            <Link to="/Loginpage">
              <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 text-xl w-32 ">
                Log in
              </button>
            </Link>
            <Link to="/Signuppage">
              <button className="bg-sienna hover:bg-black rounded-xl text-white font-semibold px-6 py-2 text-xl w-32">
                Sign up
              </button>
            </Link>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
            <p className="text-black font-semibold">Clinifowl &copy; 2024</p>
          </div>
        </div>
      )}
    </div>
  );
}
