import Page1 from "./components/openingpage/Page1";
import Loginpage from "./components/openingpage/Loginpage";
import Signuppage from "./components/openingpage/Signuppage";
import Landing from "./components/landingpage/Landing";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Signuppage" element={<Signuppage />} />
        <Route path="/Landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}
