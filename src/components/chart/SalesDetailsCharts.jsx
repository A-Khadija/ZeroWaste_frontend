import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const allData = [
  { month: 'Jan', 'Standard Box': 4000, 'Premium Box': 2400, 'Organic Box': 2400, 'Luxury Box': 1500 },
  { month: 'Feb', 'Standard Box': 3000, 'Premium Box': 1398, 'Organic Box': 2210, 'Luxury Box': 1800 },
  { month: 'Mar', 'Standard Box': 2000, 'Premium Box': 9800, 'Organic Box': 2290, 'Luxury Box': 2000 },
  { month: 'Apr', 'Standard Box': 2780, 'Premium Box': 3908, 'Organic Box': 2000, 'Luxury Box': 2500 },
  { month: 'May', 'Standard Box': 1890, 'Premium Box': 4800, 'Organic Box': 2181, 'Luxury Box': 2200 },
  { month: 'Jun', 'Standard Box': 2390, 'Premium Box': 3800, 'Organic Box': 2500, 'Luxury Box': 2800 },
  { month: 'Jul', 'Standard Box': 3490, 'Premium Box': 4300, 'Organic Box': 2100, 'Luxury Box': 3000 },
  { month: 'Aug', 'Standard Box': 4000, 'Premium Box': 2400, 'Organic Box': 2400, 'Luxury Box': 2700 },
  { month: 'Sep', 'Standard Box': 3000, 'Premium Box': 1398, 'Organic Box': 2210, 'Luxury Box': 2300 },
  { month: 'Oct', 'Standard Box': 2000, 'Premium Box': 9800, 'Organic Box': 2290, 'Luxury Box': 2100 },
  { month: 'Nov', 'Standard Box': 2780, 'Premium Box': 3908, 'Organic Box': 2000, 'Luxury Box': 1900 },
  { month: 'Dec', 'Standard Box': 1890, 'Premium Box': 4800, 'Organic Box': 2181, 'Luxury Box': 1700 },
];

const boxTypes = ['Standard Box', 'Premium Box', 'Organic Box', 'Luxury Box'];

const SalesChart = () => {
  const [selectedBox, setSelectedBox] = useState('Standard Box');

  const handleBoxChange = (event) => {
    setSelectedBox(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow duration-150">
      <div className="flex justify-between items-center mb-4">
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-1">Sales Chart</h2>
          <p className="text-[#6B7280] text-sm">Track your sales performance over time</p>
        </div>
        <select
          value={selectedBox}
          onChange={handleBoxChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          {boxTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={allData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, 'Profit']}/>
          <Legend />
          <Line type="monotone" dataKey={selectedBox} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
