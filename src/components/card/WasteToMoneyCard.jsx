
import React from 'react';
import backgroundImage from '../../assets/images/bg-card.png'; // Make sure to place the image here

const WasteToMoneyCard = ({ onGetStarted }) => {
  return (
    <div 
      className="relative bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-80 rounded-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Turn your waste into money, starting from today!
        </h2>
        <p className="text-blue-100 mb-6 text-lg">
          Transform your food waste into profit with our innovative platform. 
          Start reducing waste and increasing revenue today.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
      <div className="absolute bottom-4 right-8 w-12 h-12 bg-white bg-opacity-10 rounded-full"></div>
    </div>
  );
};

export default WasteToMoneyCard;

