// import React, { useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import ChevronDownIconUrl from '../../assets/icons/chevron-down.svg';

// // Generate some demo data for the chart
// const generateDemoData = () => {
//   const data = [];
//   const baseValue = 40000;
//   const numPoints = 20;

//   for (let i = 0; i < numPoints; i++) {
//     const xValue = `${(i * 5) + 5}k`;
//     let yValue = baseValue + Math.random() * 30000 - 15000;
//     if (i === 4) yValue = 64366.77;
//     if (i === 10) yValue = 25000;
//     if (i === 15) yValue = 75000;

//     data.push({
//       name: xValue,
//       sales: Math.max(0, Math.round(yValue)),
//     });
//   }
//   return data;
// };

// const data = generateDemoData();

// const SalesDetailsChart = () => {
//   const [selectedMonth, setSelectedMonth] = useState('October');

//   // Custom Tooltip for Recharts
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="p-3 bg-white border border-[#E5E7EB] rounded-lg shadow-lg text-sm">
//           <p className="text-[#1F2937] font-medium">{`Sales: $${payload[0].value.toLocaleString()}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB]">
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-xl font-semibold text-[#1F2937] mb-1">Sales Details</h2>
//           <p className="text-[#6B7280] text-sm">Track your sales performance over time</p>
//         </div>
//         <div className="relative">
//           <select
//             className="appearance-none bg-[#F8FAFC] border border-[#E5E7EB] text-[#1F2937] py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent transition-colors duration-150"
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             <option value="January">January</option>
//             <option value="February">February</option>
//             <option value="March">March</option>
//             <option value="April">April</option>
//             <option value="May">May</option>
//             <option value="June">June</option>
//             <option value="July">July</option>
//             <option value="August">August</option>
//             <option value="September">September</option>
//             <option value="October">October</option>
//             <option value="November">November</option>
//             <option value="December">December</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#6B7280]">
//             <img src={ChevronDownIconUrl} alt="Dropdown" className="w-4 h-4" />
//           </div>
//         </div>
//       </div>

//       <div style={{ width: '100%', height: 300 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
//             <XAxis 
//               dataKey="name" 
//               axisLine={false} 
//               tickLine={false} 
//               tick={{ fill: '#6B7280', fontSize: 12 }} 
//             />
//             <YAxis
//               tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
//               domain={[0, 100000]}
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#6B7280', fontSize: 12 }}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#3B82F6"
//               strokeWidth={2}
//               dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4, fill: '#FFFFFF' }}
//               activeDot={{ r: 6, fill: '#3B82F6', stroke: '#3B82F6', strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SalesDetailsChart;
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
