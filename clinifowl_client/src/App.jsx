import Page1 from "./components/openingpage/Page1";
import Loginpage from "./components/openingpage/Loginpage";
import Signuppage from "./components/openingpage/Signuppage";
import Landing from "./components/landingpage/Landing";
import Chatbot from "./components/chatbot/Chatbot";
import Doctor from "./components/nearbyVet/Doctor";
import Detect from "./components/detection/Detection";
import About from "./components/landingpage/Abt_us";
import DetailedAboutUs from "./components/landingpage/detailaboutus/DetailAboutUs";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GoogleCallback from "./components/openingpage/callback";
import Protected from "./protected";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Signuppage" element={<Signuppage />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/nearbydoc" element={<Doctor />} />
        <Route path="/detect" element={<Detect />} />
        <Route path="/about" element={<About />} />
        <Route path="/detailaboutus" element={<DetailedAboutUs />} />
        <Route path="/google-callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}
