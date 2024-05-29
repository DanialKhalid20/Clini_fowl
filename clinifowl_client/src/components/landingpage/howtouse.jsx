import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/poultryfarmer.png";
import img2 from "../../assets/veterinarians.png";
import img3 from "../../assets/hobbyist.png";
import img4 from "../../assets/Educational_institutes.png";
import img5 from "../../assets/Landing_page2.png";
import img6 from "../../assets/detection_page1.png";
import img7 from "../../assets/chatbotimg1.png";
import img8 from "../../assets/nearbyvetimg.png";

const howToUseImages = [img5, img6, img7, img8];
const forWhomImages = [img1, img2, img3, img4]; // Assuming same images, replace if different

function HowToUseCards({ showImages }) {
  const cardWidth = 320;
  const cardHeight = 400;
  const imageHeight = cardHeight - 50; // Slightly less than card height

  return (
    <div
      className={
        showImages ? "flex justify-start flex-wrap mt-10 gap-4" : "hidden"
      }
    >
      {howToUseImages.map((image, index) => (
        <div
          key={index}
          className="min-w-[250px] bg-darkalabaster rounded-2xl flex flex-col justify-start items-start shadow-xl"
          style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
        >
          <div className="p-4 text-left text-black font-semibold">
            {index === 0 && "Landing Page"}
            {index === 1 && "Disease Detection"}
            {index === 2 && "Chatbot"}
            {index === 3 && "Nearby Vet"}
          </div>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full rounded-b-2xl"
            style={{ height: `${imageHeight}px` }}
          />
        </div>
      ))}
    </div>
  );
}

function ForWhomCards() {
  const cardWidth = 250;
  const cardHeight = 400;
  const imageHeight = cardHeight - 50; // Slightly less than card height
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const totalCards = forWhomImages.length;

  const handleScroll = (event) => {
    setScrollPosition(event.target.scrollLeft);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  const handlePrevClick = () => {
    const newPosition = Math.max(scrollPosition - cardWidth, 0);
    setScrollPosition(newPosition);
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const handleNextClick = () => {
    const maxScroll = (totalCards - 1) * cardWidth;
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
    setScrollPosition(newPosition);
    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-10">
      <div
        className="overflow-x-scroll scroll-smooth flex gap-8"
        ref={scrollContainerRef}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "darkalabaster darkalabaster",
        }}
      >
        {forWhomImages.map((image, index) => (
          <div
            key={index}
            className="relative min-w-[250px] bg-darkalabaster rounded-2xl flex flex-col justify-between shadow-xl"
            style={{ height: `${cardHeight}px` }}
          >
            <div className="flex justify-start items-start text-black text-xl sm:text-2xl font-semibold pt-3 px-2 text-left">
              {index === 0 && "Poultry Farmers"}
              {index === 1 && "Veterinarians"}
              {index === 2 && "Hobbyists"}
              {index === 3 && "Educational institutes"}
            </div>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="absolute bottom-2 right-2 w-[200px] h-[180px] object-contain"
              style={{ height: `${imageHeight}px` }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
        <button
          className="pointer-events-auto opacity-50 hover:opacity-100 disabled:opacity-25 disabled:pointer-events-none bg-white rounded-full p-2"
          disabled={scrollPosition === 0}
          onClick={handlePrevClick}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="pointer-events-auto opacity-50 hover:opacity-100 disabled:opacity-25 disabled:pointer-events-none bg-white rounded-full p-2"
          disabled={scrollPosition >= (totalCards - 1) * cardWidth}
          onClick={handleNextClick}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default function HowToUse() {
  const [showImages, setShowImages] = useState(false);

  const handleLearnMoreClick = () => {
    setShowImages((prevShowImages) => !prevShowImages); // Toggle showImages state
  };

  return (
    <div className="mt-20 pt-12 pb-12 bg-dutchwhite">
      <div className="mx-auto max-w-5xl pt-10">
        <h1 className="text-black font-bold text-4xl">How Does It Work?</h1>
        <p className="text-gray-900 font-medium text-lg text-justify mt-5">
          Clinifowl is a user-friendly website designed to help you care for
          your chickens&apos; health. Get started by easily adding pictures of
          your hen&apos;s feces to detect potential signs of Salmonella or
          Coccidiosis. Additionally, our chatbot section allows you to ask
          various health-related questions directly for expert advice. Finding
          nearby vets is a breeze too! Simply click on "Nearby Vets" in the menu
          and grant location access to explore dozens of qualified veterinary
          doctors in your vicinity.&nbsp;
          <span
            className="text-sienna font-bold hover:underline cursor-pointer"
            onClick={handleLearnMoreClick}
          >
            {showImages ? "Hide" : "How To Use"}
          </span>
        </p>

        <HowToUseCards showImages={showImages} />

        <h1 className="text-black font-bold text-4xl mt-20">For Whom?</h1>
        <ForWhomCards />
      </div>
    </div>
  );
}
