import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-alabaster">
      <div className="max-w-6xl flex items-center justify-between mx-auto ">
        <div className="flex items-center">
          <img
            src={logo}
            width={80}
            height={80}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <a href="/" className="text-black font-semibold text-3xl">
            Clinifowl
          </a>
        </div>
        <nav className="flex gap-8 text-bg text-primary items-center font-semibold text-lg">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/" className="hover:underline">
            Detection
          </a>
          <Link to="/chatbot">
            <div className="hover:underline">Chatbot</div>
          </Link>
          <Link to="/nearbydoc">
            <div className="hover:underline">Nearby Vet</div>
          </Link>
          <a
            href="/"
            className="bg-sienna text-white text-xl rounded-full px-6 py-2"
          >
            Logout
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
