import img1 from "../../assets/extensive_dataset.png";
import img2 from "../../assets/chatbot.png";
import img3 from "../../assets/nearbyvet.png";

export default function Card() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-4 mb-10 pb-12">
      <div className="relative w-full h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">6000+</h2>
          <p className="text-base sm:text-lg text-black">images detected</p>
        </div>
        <img
          src={img1}
          alt="Extensive Dataset"
          className="absolute bottom-0 right-0"
          style={{ width: '50%', height: 'auto' }}
        />
      </div>
      <div className="relative w-full h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">10K+</h2>
          <p className="text-base sm:text-lg text-black">questions answered by chatbot</p>
        </div>
        <img
          src={img2}
          alt="Chatbot"
          className="absolute bottom-0 right-0"
          style={{ width: '50%', height: 'auto' }}
        />
      </div>
      <div className="relative w-full h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-black">100+</h2>
          <p className="text-base sm:text-lg text-black">veterinary doctors near you</p>
        </div>
        <img
          src={img3}
          alt="Nearby Vet"
          className="absolute bottom-0 right-0"
          style={{ width: '50%', height: 'auto' }}
        />
      </div>
    </div>
  );
}
