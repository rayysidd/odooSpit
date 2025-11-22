import { useState, useEffect } from 'react';
import KPICard from '../components/dashboard/KPICard';
import InventoryChart from '../components/dashboard/InventoryChart';
import DashboardFilter from '../components/dashboard/DashboardFilter';

export default function Dashboard() {
  const [filters, setFilters] = useState([
    {
      label: 'Warehouse',
      name: 'warehouse',
      type: 'select',
      options: [{ value: '', label: 'All Warehouses' }],
      value: '',
    },
    {
      label: 'Category',
      name: 'category',
      type: 'select',
      options: [{ value: '', label: 'All Categories' }],
      value: '',
    },
  ]);

  const [kpis, setKpis] = useState({
    totalProducts: 0,
    lowStock: 0,
    pendingReceipts: 0,
  });

  const [chartData, setChartData] = useState(null);

  const handleFilterChange = (name, value) => {
    setFilters((prev) =>
      prev.map((f) => (f.name === name ? { ...f, value } : f))
    );
    // TODO: Fetch/filter data according to new filters...
  };

  useEffect(() => {
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
    <main className="min-h-screen p-6">
      <section className="mb-8">
        <DashboardFilter filters={filters} onChange={handleFilterChange} />
      </section>

      <section aria-label="Key Performance Indicators" className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="rounded-lg shadow p-4">
            <KPICard title="Total Products" value={kpis.totalProducts} />
          </div>
          <div className="rounded-lg shadow p-4">
            <KPICard
              title="Low Stock Items"
              value={kpis.lowStock}
              trend={-5}
              trendType="down"
            />
          </div>
          <div className="rounded-lg shadow p-4">
            <KPICard
              title="Pending Receipts"
              value={kpis.pendingReceipts}
              trend={10}
              trendType="up"
            />
          </div>
        </div>
      </section>

      {chartData && (
        <section aria-label="Inventory Trend Chart" className="rounded-lg shadow p-6">
          <InventoryChart
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: 'bottom' },
                title: { display: true, text: 'Inventory Trends' },
              },
            }}
            className="mt-4"
          />
        </section>
      )}
    </main>
  );
}
