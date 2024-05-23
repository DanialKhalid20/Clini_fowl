import React, { useState } from "react";
import axios from "axios";
import myimage from "../../assets/hen_ai_4r.png";
import Header from "../landingpage/Header";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detections, setDetections] = useState([]);
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track submission

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log("File selected:", event.target.files[0]);
  };

  const handleSubmit = async () => {
    setError(null); // Reset previous errors
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setDetections(response.data.detections);
      setImage(`data:image/jpeg;base64,${response.data.image}`);

      setHasSubmitted(true); // Set submission flag
    } catch (error) {
      setError("There was an error uploading the file!");
      console.error("There was an error uploading the file!", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-alabaster">
      <Header />
      <div className="main flex flex-col lg:flex-row w-full max-w-6xl mt-8">
        {/* Left side - Result Section */}
        <div className="flex flex-col items-center justify-start w-full lg:w-1/2 p-4">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {image && (
            <img
              src={image}
              alt="Detected result"
              className="w-full max-h-[80vh] object-contain rounded-lg mb-4"
            />
          )}
          {detections.length > 0 && (
            <ul className="mt-4 space-y-2 w-full">
              {detections.map((detection, index) => (
                <li
                  key={index}
                  className="p-2 bg-darkalabaster rounded-lg flex justify-between items-center text-lg"
                >
                  <span className="font-semibold text-black flex space-x-2">
                    <span>{detection.class}:</span>
                    <span>{(detection.confidence * 100).toFixed(2)}%</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {hasSubmitted && detections.length === 0 && !error && (
            <div className="text-red-500 text-lg mt-4">No detection found.</div>
          )}
        </div>
        {/* Right side - Upload Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-4">
          <div className="relative w-full mb-4">
            <div className="halfCircleStyle"></div>
            <img
              className="imag mx-auto max-h-[300px]"
              src={myimage}
              alt="hen"
            />
          </div>
          <div className="txt text-center mt-4">
            <h1 className="text-3xl font-bold mb-2">
              Detecting Diseases Using Fecal Images
            </h1>
            <h3 className="text-lg">Upload Image To Find Out</h3>
          </div>
          <div className="uploadimg flex flex-col sm:flex-row items-center justify-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-grey file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-darkalabaster file:text-celestialblue hover:file:bg-dutchwhite"
            />
            <button
              onClick={handleSubmit}
              className="bg-sienna text-white py-2 px-4 rounded-lg hover:bg-opacity-90 whitespace-nowrap"
            >
              Upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detection;
