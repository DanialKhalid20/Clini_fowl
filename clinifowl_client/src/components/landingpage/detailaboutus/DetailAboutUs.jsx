import React from 'react';
import Header from '../Header';
import img1 from "../../../assets/trio_doc.png";
import WhatiscliniFowl from './Whatisclinifowl';
import Card from "../Cards1";
import Howtouse from "../howtouse";
import Footer from "../footer";



export default function DetailedAboutUs() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-alabaster p-4 flex flex-col items-center justify-center">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-8 overflow-y-auto mb-8 md:mb-0">
            <div className="text-lg md:text-xl text-gray-800 mb-4">
              <p className="mb-4">Your guide to good poultry health.</p>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Made by computer science final year students to help poultry farmers.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed mb-4">
                We believe that you and your close ones deserve to have access to reliable information regarding your health. Symptomate can help. Born from a unique mix of medical and technological expertise, it’s always ready to support you with the right health recommendation.
              </p>
              {/* Add more detailed content as needed */}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src={img1}
              alt="Trio Docs"
              className="w-full h-auto md:h-full"
            />
          </div>
        </div>
      </div>
      <WhatiscliniFowl/>
      <Card/>
    <Howtouse/>
    <Footer/>
    </>
  );
}
