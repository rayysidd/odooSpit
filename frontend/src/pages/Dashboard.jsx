import { useState, useEffect } from 'react';
import axios from 'axios';
import KPICard from '../components/dashboard/KPICard';
import InventoryChart from '../components/dashboard/InventoryChart';
import DashboardFilter from '../components/dashboard/DashboardFilter';
import Loader from '../components/common/Loader';

export default function Dashboard() {
  // 1. State for Filters
  const [filters, setFilters] = useState([
    {
      label: 'Warehouse',
      name: 'warehouse',
      type: 'select',
      options: [{ value: '', label: 'All Warehouses' }], // You could fetch real locations here too
      value: '',
    },
  ]);

  // 2. State for Real-Time KPIs
  const [kpis, setKpis] = useState({
    totalProducts: 0,
    lowStock: 0,
    pendingReceipts: 0,
    pendingDeliveries: 0,
    internalTransfers: 0,
    occupancy: 0
  });

  // 3. State for Chart (Mocked for now as backend doesn't have history API yet)
  const [chartData, setChartData] = useState(null);
  
  // 4. UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilterChange = (name, value) => {
    setFilters((prev) =>
      prev.map((f) => (f.name === name ? { ...f, value } : f))
    );
    // Future: You can pass this 'value' to the API call to filter by warehouse
  };

  // 5. Fetch Data from Backend
  useEffect(() => {
    // Fetch dashboard KPIs and inventory trend chart data (mock or from API)
    setKpis({
      totalProducts: 320,
      lowStock: 15,
      pendingReceipts: 4,
    });

    setChartData({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Inventory Over Time',
          data: [300, 310, 320, 315, 330],
          borderColor: '#5171f7',
          fill: false,
        },
      ],
    });
  }, []);

  return (
    <main className="p-6 space-y-6">
      <DashboardFilter filters={filters} onChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Total Products" value={kpis.totalProducts} />
        <KPICard
          title="Low Stock Items"
          value={kpis.lowStock}
          trend={-5}
          trendType="down"
        />
        <KPICard
          title="Pending Receipts"
          value={kpis.pendingReceipts}
          trend={10}
          trendType="up"
        />
      </div>

      {chartData && (
        <InventoryChart
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true, position: 'bottom' },
              title: { display: true, text: 'Inventory Trends' },
            },
          }}
          className="mt-6"
        />
      )}
    </main>
  );
}