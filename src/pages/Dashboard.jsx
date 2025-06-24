import React from 'react';
import StatsCardsContainer from '../components/card/StatsCardsContainer';
import SalesChart from '../components/chart/SalesDetailsCharts'; 
import OrderDetailsTable from '../components/table/OrderDetailsTable';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1F2937] mb-2">Dashboard</h1>
        <p className="text-[#6B7280]">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {}
      <StatsCardsContainer />

      {}
      <SalesChart />

      {}
      <OrderDetailsTable />
    </div>
  );
};

export default DashboardPage;
