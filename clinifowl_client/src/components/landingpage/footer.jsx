import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="bg-dutchwhite">
      <footer className=" max-w-6xl flex items-center justify-between mx-auto px-8">
        <div>
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
          {/* Add your Twitter link here */}
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <RiTwitterXFill className="text-2xl text-black hover:text-gray-300" />{" "}
            {/* Replace with your Twitter icon */}
          </a>
        </div>
        <div className="text-right text-black">
          <p>Clinifowl &copy; 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
