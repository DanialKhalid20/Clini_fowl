import Typewriter from "typewriter-effect";

export default function Typewriterr() {
  return (
    <h1 className="text-sienna font-bold text-4xl pt-1">
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 90,
          strings: [
            "Poultry Farmers",
            "Veterinary Doctors",
            "Poultry Hobbyists",
            "Educational Institutes",
          ],
        }}
      />
    </h1>
  );
}
