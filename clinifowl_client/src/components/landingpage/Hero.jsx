import { FaCheck } from "react-icons/fa";
import img from "../../assets/hen_saying_hello.png";
import Typewriterr from "./adds_on/Text";
const Hero = () => {
  return (
    <section className="bg-alabaster min-h-screen">
      <div className="max-w-5xl mx-auto px-8 grid mt-8 grid-cols-2 pt-20 relative">
        <div>
          <h1 className="text-5xl pt-10 font-semibold">
            Clinifowl is made <br className="py-1" />
            by experts for
            <br />
            <Typewriterr />
          </h1>

          <p>
            <span className="font-semibold text-xl">
              <br />
              Empower yourself with hen health insights:
              <br />
              <br />
            </span>
            <span className="font-500 text-lg">
              <FaCheck
                style={{ display: "inline-block", marginRight: "5px" }}
              />{" "}
              Detect diseases using feces analysis
              <br />
              <FaCheck
                style={{ display: "inline-block", marginRight: "5px" }}
              />{" "}
              Engage with chatbot for assistance
              <br />
              <FaCheck
                style={{ display: "inline-block", marginRight: "5px" }}
              />{" "}
              Find nearby veterinary doctors for consultation
            </span>
            <br />
            <br />
            <span className="font-semibold text-xl">
              Join thousands relying on Clinifowl for healthy hens!
            </span>
          </p>
        </div>

        <div className="relative">
          {/* Vertical oval */}
          <div
            className="absolute top-3 right-0 z-20"
            style={{
              width: "300px", // Adjust width as needed
              height: "400px", // Adjust height as needed
              backgroundColor: "#f5e6c6",
              borderRadius: "50%", // 50% border radius makes it a circle
              zIndex: 20, // Ensure oval is in front of text
            }}
          >
            {/* Hero image inside oval */}
            <img
              src={img}
              width={250}
              height={100}
              alt="Hero image"
              className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
