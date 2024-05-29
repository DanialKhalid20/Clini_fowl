import Header from "./Header";
import Hero from "./Hero";
import About from "./Abt_us";
import Card from "./Cards1";
import Video from "./Videos";
import Howtouse from "./howtouse";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  if (!sessionStorage) {
    navigate("/");
  }
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Card />
      <Video />
      <Howtouse />
      <Footer />
    </>
  );
}
