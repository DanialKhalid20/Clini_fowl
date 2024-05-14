import img1 from "../../assets/extensive_dataset.png";
import img2 from "../../assets/chatbot.png";
import img3 from "../../assets/nearbyvet.png";

export default function Card() {
  return (
    <div className="grid grid-cols-3 max-w-6xl  pl-3 mx-auto gap-10 max-h-screen mb-10 pb-12">
      <div className="relative w-13 h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-black">6000+</h2>
          <p className="text-lg text-black">images detected</p>
        </div>
        <img
          src={img1}
          alt="Extensive Dataset"
          className="absolute bottom-0 right-0"
          style={{ width: 200, height: 180 }}
        />
      </div>
      <div className="relative w-13 h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-black">10K+</h2>
          <p className="text-lg text-black">questions answered by chatbot</p>
        </div>
        <img
          src={img2}
          alt="Chatbot"
          className="absolute bottom-0 right-0"
          style={{ width: 200, height: 180 }}
        />
      </div>
      <div className="relative w-13 h-64 bg-dutchwhite rounded-2xl flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-3xl font-semibold text-black">100+</h2>
          <p className="text-lg text-black">veterinary doctors near you</p>
        </div>
        <img
          src={img3}
          alt="Nearby Vet"
          className="absolute bottom-0 right-0"
          style={{ width: 200, height: 180 }}
        />
      </div>
    </div>
  );
}
