import React from 'react';

const StatCard = ({ iconUrl, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow duration-150">
      <div className="flex items-center space-x-4">
        {/* Icon Container */}
        <div 
          className="p-3 rounded-full flex items-center justify-center"
        >
          {iconUrl && (
            <img 
              src={iconUrl} 
              alt={title} 
            />
          )}
        </div>

        {/* Text Content */}
        <div className="flex-1">
          <p className="text-[#6B7280] text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#2B3034]">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
