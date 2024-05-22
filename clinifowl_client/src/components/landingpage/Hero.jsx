import { FaCheck } from "react-icons/fa";
import img from "../../assets/hen_saying_hello.png";
import Typewriterr from "./adds_on/Text";

const Hero = () => {
  return (
    <section className="bg-alabaster min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 mt-8 pt-8 relative">
        <div className="order-2 md:order-1 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            Clinifowl is made <br className="py-1" />
            by experts for
            <br/>
            <Typewriterr />
          </h1>

          <p className="mt-6">
            <span className="font-semibold text-lg sm:text-xl">
              Empower yourself with hen health insights:
              <br />
              <br />
            </span>
            <span className="font-medium text-md sm:text-lg">
              <FaCheck className="inline-block mr-2" /> Detect diseases using feces analysis
              <br />
              <FaCheck className="inline-block mr-2" /> Engage with chatbot for assistance
              <br />
              <FaCheck className="inline-block mr-2" /> Find nearby veterinary doctors for consultation
            </span>
            <br />
            <br />
            <span className="font-semibold text-lg sm:text-xl">
              Join thousands relying on Clinifowl for healthy hens!
            </span>
          </p>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center items-center">
          {/* Vertical oval */}
          <div className="relative w-[200px] h-[300px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px] bg-[#f5e6c6] rounded-full flex items-center justify-center">
            {/* Hero image inside oval */}
            <img
              src={img}
              alt="Hero image"
              className="w-[80%] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
