// Import necessary libraries and components
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

// Import DetailAboutUs component


// Define your About component
export default function About() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-8 pt-12 mt-20 pb-12 mb-10 text-black">
        <h1 className="text-5xl font-semibold">About Clinifowl</h1>
        <p className="pt-6 text-lg">
          Clinifowl is a self-service symptom checker made by experts for anyone
          <br />
          wishing to learn more about their poultry symptoms, find their
          possible
          <br />
          causes, get guidance on what to do next, or simply to better prepare
          for
          <br />
          medical appointment.
          <br />
        </p>
        {/* Use Link to navigate to DetailAboutUs */}
        <h1 className="pt-6 text-lg">
          Learn more&nbsp;
          <Link to="/detailaboutus" className="text-sienna font-semibold hover:underline">
            about us.
          </Link>
        </h1>
      </div>
    </>
  );
}
