import { useState, useEffect, useRef } from "react";
import img1 from "../../assets/poultryfarmer.png";
import img2 from "../../assets/veterinarians.png";
import img3 from "../../assets/hobbyist.png";
import img4 from "../../assets/Educational_institutes.png";

const images = [img1, img2, img3, img4];
export default function HowToUse() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const cardWidth = 350; // Set the desired width for each card
  const totalCards = 4; // Total number of cards
  const scrollContainerRef = useRef(null);

  // Calculate total pages based on number of cards
  const totalPages = Math.ceil(totalCards / cardWidth);

  // Handle scroll events efficiently with useRef
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
  };

  const handleNextClick = () => {
    const maxScroll = (totalPages - 1) * cardWidth;
    const newPosition = Math.min(scrollPosition + cardWidth, maxScroll);
    setScrollPosition(newPosition);
  };

  return (
    <div className="mt-20 pt-12 pb-12 bg-dutchwhite">
      <div className="mx-auto max-w-4xl pt-10">
        <h1 className="text-black font-bold text-4xl">How Does It Work?</h1>
        <p className="text-black font-semibold text-lg text-justify mt-5">
          Clinifowl is a user-friendly website designed to help you care for
          your chickens&apos; health. Get started by easily adding pictures of
          your hen&apos;s feces to detect potential signs of Salmonella or
          Coccidiosis. Additionally, our chatbot section allows you to ask
          various health-related questions directly for expert advice. Finding
          nearby vets is a breeze too! Simply click on "Nearby Vets" in the menu
          and grant location access to explore dozens of qualified veterinary
          doctors in your vicinity.&nbsp;
          <span className="text-sienna font-bold hover:underline cursor-pointer">
            Learn more.
          </span>
        </p>

        <h1 className="text-black font-bold text-4xl mt-20">For Whom?</h1>
      </div>
      {/* Text section */}
      <div className="mx-auto max-w-5xl mb-5">
        <div
          className="overflow-x-scroll scroll-smooth"
          ref={scrollContainerRef}
        >
          <div
            className="flex"
            style={{ width: `${cardWidth * totalCards}px`, minHeight: "400px" }}
          >
            {/* Cards with images */}
            {images.slice(0, totalCards).map((image, index) => (
              <div
                key={index}
                className="relative w-40 h-80 bg-darkalabaster rounded-2xl flex flex-col justify-between shadow-xl mt-10 mr-10 "
                style={{ width: `${cardWidth}px`, overflowY: "auto" }}
              >
                <div className="flex justify-center items-center text-black text-2xl font-semibold pt-3">
                  {index === 0 && (
                    <div className="text-black font-bold">Poultry Farmers</div>
                  )}
                  {index === 1 && (
                    <div className="text-black font-bold">Veterinarians</div>
                  )}
                  {index === 2 && (
                    <div className="text-black font-bold">Hobbyists</div>
                  )}
                  {index === 3 && (
                    <div className="text-black font-bold">
                      Educational institutes
                    </div>
                  )}
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="absolute bottom-2 right-2"
                    style={{ width: 220, height: 250 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="mx-auto max-w-5xl">
        <div className="flex justify-between">
          <button
            className="opacity-50 hover:opacity-100 disabled:opacity-25 disabled:pointer-events-none"
            disabled={scrollPosition === 0}
            onClick={handlePrevClick}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            className="opacity-50 hover:opacity-100 disabled:opacity-25 disabled:pointer-events-none"
            disabled={scrollPosition === (totalPages - 1) * cardWidth}
            onClick={handleNextClick}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
