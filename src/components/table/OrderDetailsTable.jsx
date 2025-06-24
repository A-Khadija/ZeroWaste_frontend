import React, { useState } from 'react';

const OrderDetailsTable = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Sample order data matching Figma design
  const orders = [
    {
      id: 1,
      productName: 'Standard Box',
      date: '08/09/2025',
      pickupTime: '12:03 PM',
      quantity: 1,
      amount: '$34',
      status: 'picked'
    },
    {
      id: 2,
      productName: 'Premium Box',
      date: '08/09/2025',
      pickupTime: '2:15 PM',
      quantity: 2,
      amount: '$68',
      status: 'pending'
    },
    {
      id: 3,
      productName: 'Family Box',
      date: '07/09/2025',
      pickupTime: '10:30 AM',
      quantity: 1,
      amount: '$45',
      status: 'picked'
    },
    {
      id: 4,
      productName: 'Organic Box',
      date: '07/09/2025',
      pickupTime: '4:45 PM',
      quantity: 3,
      amount: '$102',
      status: 'delivered'
    },
    {
      id: 5,
      productName: 'Vegan Box',
      date: '06/09/2025',
      pickupTime: '11:20 AM',
      quantity: 1,
      amount: '$38',
      status: 'failed'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      picked: {
        text: 'Picked',
        className: 'bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium'
      },
      pending: {
        text: 'Pending',
        className: 'bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-medium'
      },
      failed: {
        text: 'Failed',
        className: 'bg-[#EF4444] text-white px-3 py-1 rounded-full text-xs font-medium'
      }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={config.className}>
        {config.text}
      </span>
    );
  };

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[#2B3034] mb-1">Orders Details</h2>
          <p className="text-[#6B7280] text-sm">Track your latest order status and details</p>
        </div>
        <div className="relative">
          <select
            className="appearance-none bg-[#F8FAFC] border border-[#E5E7EB] text-[#2B3034] py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-[#4379EE] focus:border-transparent transition-colors duration-150"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="picked">Picked</option>
            <option value="pending">Pending</option>
            <option value="failed">Canceled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#F3F4F6]">
              <th className="text-left py-3 px-4 text-[#6B7280] font-medium text-sm">Product Name</th>
              <th className="text-left py-3 px-4 text-[#6B7280] font-medium text-sm">Date</th>
              <th className="text-left py-3 px-4 text-[#6B7280] font-medium text-sm">Pick-up Time</th>
              <th className="text-center py-3 px-4 text-[#6B7280] font-medium text-sm">Quantity</th>
              <th className="text-right py-3 px-4 text-[#6B7280] font-medium text-sm">Amount</th>
              <th className="text-center py-3 px-4 text-[#6B7280] font-medium text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr 
                key={order.id} 
                className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC] transition-colors duration-150"
              >
                <td className="py-3 px-4 text-[#2B3034] font-medium">{order.productName}</td>
                <td className="py-3 px-4 text-[#2B3034]">{order.date}</td>
                <td className="py-3 px-4 text-[#2B3034]">{order.pickupTime}</td>
                <td className="py-3 px-4 text-[#2B3034] text-center">{order.quantity}</td>
                <td className="py-3 px-4 text-[#2B3034] font-medium text-right">{order.amount}</td>
                <td className="py-3 px-4 text-center">
                  {getStatusBadge(order.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#6B7280]">No orders found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsTable;
