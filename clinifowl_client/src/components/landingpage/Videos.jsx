import Vids from "./adds_on/generic_vids";

export default function Video() {
  return (
    <div className="bg-dutchwhite max-w-2xl mx-auto p-12 mt-20 mb-40 rounded-2xl max-h-xl">
      <div className="flex items-center gap-8">
        <Vids
          src="https://videos.pexels.com/video-files/4911803/4911803-uhd_2160_4096_25fps.mp4"
          width={150}
          height={300}
        />
        <div className="flex flex-col justify-center text-sienna text-3xl font-bold ">
          <h1>Let</h1>
          <h1>us</h1>
          <h1>help</h1>
          <h1>you</h1>
          <h1>to</h1>
        </div>
        <Vids
          src="https://videos.pexels.com/video-files/856986/856986-hd_1920_1080_25fps.mp4"
          width={300}
          height={500}
        />
      </div>
      <div className="flex items-center gap-8">
        <Vids
          src="https://videos.pexels.com/video-files/8114888/8114888-uhd_4096_2160_25fps.mp4"
          width={300}
          height={500}
        />
        <div className="flex flex-col justify-center text-sienna text-3xl font-bold">
          <h1>take</h1>
          <h1>care</h1>
          <h1>of</h1>
          <h1>your</h1>
          <h1>Hens</h1>
        </div>
        <Vids
          src="https://videos.pexels.com/video-files/9848798/9848798-hd_1080_1920_30fps.mp4"
          width={150}
          height={300}
        />
      </div>
    </div>
  );
}
