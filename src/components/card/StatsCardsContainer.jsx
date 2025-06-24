import React from 'react';
import StatCard from './StatCard';

import TotalOrdersIcon from '../../assets/icons/total-orders.svg';
import TotalBoxesIcon from '../../assets/icons/total-boxes.svg';
import TotalSalesIcon from '../../assets/icons/total-sales.svg';
import TotalVisitsIcon from '../../assets/icons/total-visits.svg';

const StatsCardsContainer = () => {
  const statsData = [
    {
      id: 1,
      iconUrl: TotalOrdersIcon,
      title: 'Total Orders',
      value: '40',
    },
    {
      id: 2,
      iconUrl: TotalBoxesIcon,
      title: 'Total Boxes',
      value: '104',
    },
    {
      id: 3,
      iconUrl: TotalSalesIcon,
      title: 'Total Sales',
      value: '$89,00',
    },
    {
      id: 4,
      iconUrl: TotalVisitsIcon,
      title: 'Total Visits',
      value: '20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          iconUrl={stat.iconUrl}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatsCardsContainer;
