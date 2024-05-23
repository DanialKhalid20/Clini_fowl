import { useState } from "react";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const signupwithgoogle = () => {
  window.open("http://localhost:8080/auth/google/callback", "_self");
};

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [emptyField, setEmptyField] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailExist, setEmailExists] = useState(false);

  const auth = () => {
    localStorage.setItem("login", true);
  };

  const z = () => {
    const path = window.location.pathname;
    console.log(path);
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    setInvalidEmail(false);
    setEmptyField(false);
    setInvalidPassword(false);
    setPasswordsMatch(true);
    setEmailSent(false);
    setEmailExists(false);

    if (!email || !password || !reenteredPassword) {
      setEmptyField(true);
      setEmailExists(false);

      return;
    }
    if (password.length < 8) {
      setInvalidPassword(true);
      setEmailExists(false);

      return;
    }
    if (!emailRegex.test(email)) {
      setInvalidEmail(true);
      setEmailExists(false);

      return;
    }
    if (password !== reenteredPassword) {
      setPasswordsMatch(false);
      setEmailExists(false);

      return;
    }

    axios
      .post("http://localhost:8080/Signuppage", { email, password })
      .then((result) => {
        console.log(result);
        setEmailExists(false);

        setEmailSent(true);
        auth();
      })
      .catch((err) => {
        setEmailExists(true);

        console.log(err.response.data);
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
            Signup
          </h2>
          {emptyField && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please fill all the data
            </div>
          )}
          {invalidEmail && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Invalid email format
            </div>
          )}
          {invalidPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Password should consist 8 characters
            </div>
          )}
          {!passwordsMatch && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Reentered password doesn&apos;t match
            </div>
          )}
          {emailSent && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please check your email and click on the link.
            </div>
          )}
          {emailExist && (
            <div className="mb-4 text-red-500 text-lg text-center">
              This email is already registered.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
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
            <div className="mb-4">
              <label
                htmlFor="reenter-password"
                className="block text-lg font-medium text-gray-700"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="reenter-password"
                value={reenteredPassword}
                onChange={(e) => setReenteredPassword(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-sienna text-white text-lg font-medium py-2 rounded-md hover:bg-sienna-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 mb-6">
            <button
              onClick={() => {
                signupwithgoogle();
                z(); // Assuming z is another function
              }}
              className="w-full flex justify-center gap-2 bg-celestialblue text-white text-lg font-medium py-2 rounded-lg mb-4"
            >
              <FcGoogle className="text-3xl " />
              Continue with Google
            </button>
          </p>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/Loginpage" className="text-sienna hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-alabaster p-8 rounded-2xl shadow-2xl w-full min-h-full">
          <Link to="/">
            <div className="flex justify-end">
              <MdClose className="text-black cursor-pointer" />
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Signup
          </h2>
          {emptyField && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please fill all the data
            </div>
          )}
          {invalidEmail && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Invalid email format
            </div>
          )}
          {invalidPassword && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Password should consist 8 characters
            </div>
          )}
          {!passwordsMatch && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Reentered password doesn&apos;t match
            </div>
          )}
          {emailSent && (
            <div className="mb-4 text-red-500 text-lg text-center">
              Please check your email and click on the link.
            </div>
          )}
          {emailExist && (
            <div className="mb-4 text-red-500 text-lg text-center">
              This email is already registered.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
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
            <div className="mb-4">
              <label
                htmlFor="reenter-password"
                className="block text-lg font-medium text-gray-700"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="reenter-password"
                value={reenteredPassword}
                onChange={(e) => setReenteredPassword(e.target.value)}
                className="p-1 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-sienna text-white text-lg font-medium py-2 rounded-md hover:bg-sienna-300"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 mb-6">
            <button
              onClick={() => {
                signupwithgoogle();
                z(); // Assuming z is another function
              }}
              className="w-full flex justify-center gap-2 bg-celestialblue text-white text-lg font-medium py-2 rounded-lg mb-4"
            >
              <FcGoogle className="text-3xl " />
              Continue with Google
            </button>
          </p>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link to="/Loginpage" className="text-sienna hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
