import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const signupwithgoogle = () => {
  window.open("http://localhost:8080/auth/google/callback", "_self");
};

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [accountNotExist, setAccountNotExist] = useState(false);
  const [accountverified, setAccountverified] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmptyField(false);
    setInvalidEmail(false);
    setIncorrectPassword(false);
    setAccountNotExist(false);
    setAccountverified(false);

    if (!email || !password) {
      setEmptyField(true);
      return;
    }

    if (!emailRegex.test(email)) {
      setInvalidEmail(true);
      return;
    }

    axios
      .post("http://localhost:8080/Loginpage", { email, password })
      .then((result) => {
        console.log(result);

        if (result.data.message === "Success") {
          navigate("/Landing");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.error === "Please verify your email first") {
          setAccountverified(true);
          setIncorrectPassword(false);
          setAccountNotExist(false);
          setInvalidEmail(false);
        } else if (err.response.data.error === "Account does not exist") {
          setAccountNotExist(true);
          setIncorrectPassword(false);
          setInvalidEmail(false);
          setAccountverified(false);
        } else if (err.response.data.error === "Incorrect password") {
          setIncorrectPassword(true);
          setAccountNotExist(false);
          setInvalidEmail(false);
          setAccountverified(false);
        }
      });
  };

  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="flex justify-center items-center h-screen bg-grey">
      {isLg ? (
        <div className="bg-alabaster p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <Link to="/">
            <div className="flex justify-end">
              <MdClose className="text-black cursor-pointer" />
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Login
          </h2>
          {emptyField && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please fill all the data
            </div>
          )}
          {invalidEmail && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Invalid email
            </div>
          )}
          {incorrectPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Incorrect password
            </div>
          )}
          {accountNotExist && !incorrectPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Account does not exist
            </div>
          )}
          {accountverified && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please verify your account first
            </div>
          )}

          <form onSubmit={handleSubmit} action="POST">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-medium font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-sienna text-white text-lg font-medium py-2 rounded-lg "
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-4 mb-6">
            <button
              className="w-full flex justify-center gap-2 bg-celestialblue text-white text-lg font-medium py-2 rounded-lg mb-4"
              onClick={() => {
                signupwithgoogle();
              }}
            >
              <FcGoogle className="text-3xl " />
              Continue with Google
            </button>
          </p>

          <div className="text-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/Signuppage" className="text-sienna hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-alabaster p-8 h-full w-full ">
          <Link to="/">
            <div className="flex justify-end">
              <MdClose className="text-black cursor-pointer" />
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Login
          </h2>
          {emptyField && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please fill all the data
            </div>
          )}
          {invalidEmail && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Invalid email
            </div>
          )}
          {incorrectPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Incorrect password
            </div>
          )}
          {accountNotExist && !incorrectPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Account does not exist
            </div>
          )}
          {accountverified && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please verify your account first
            </div>
          )}

          <form onSubmit={handleSubmit} action="POST">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-medium font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-sienna text-white text-lg font-medium py-2 rounded-lg "
              >
                Log In
              </button>
            </div>
          </form>

          <p className="mt-4 mb-6">
            <button
              className="w-full flex justify-center gap-2 bg-celestialblue text-white text-lg font-medium py-2 rounded-lg mb-4"
              onClick={() => {
                signupwithgoogle();
              }}
            >
              <FcGoogle className="text-3xl " />
              Continue with Google
            </button>
          </p>

          <div className="text-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/Signuppage" className="text-sienna hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
