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
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get Token for Auth
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("No authentication token found");

        // Call the Backend API
        // Note: If you select a warehouse filter, you can append ?warehouseId=... here
        const response = await axios.get('/api/dashboard/kpis', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const data = response.data;

        // Update State with Real Backend Data
        setKpis({
          totalProducts: data.totalProductsInStock,
          lowStock: data.lowStockCount,
          pendingReceipts: data.pendingReceipts,
          pendingDeliveries: data.pendingDeliveries,
          internalTransfers: data.internalTransfersScheduled,
          occupancy: data.warehouseOccupancy?.occupancyPercent || 0
        });

        // Set Chart Data (Static for now, can be dynamic later)
        setChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Stock Level Trend',
              data: [data.totalProductsInStock - 5, data.totalProductsInStock - 2, data.totalProductsInStock, data.totalProductsInStock], // Simulated trend
              borderColor: '#3b82f6', // Blue-500
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              tension: 0.3,
            },
          ],
        });

      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Failed to load dashboard data. Please ensure backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array = run once on mount

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="p-6 text-center text-red-400">
        <p className="text-xl font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="p-6 space-y-6">
      {/* Filter Section */}
      <DashboardFilter filters={filters} onChange={handleFilterChange} />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Total Products" 
          value={kpis.totalProducts} 
          // You can add icons here if you import them (e.g., from react-icons)
        />
        
        <KPICard
          title="Low Stock Alerts"
          value={kpis.lowStock}
          trendType="down" // Red if > 0 usually
          className={kpis.lowStock > 0 ? "border-l-4 border-red-500" : ""}
        />
        
        <KPICard
          title="Pending Receipts"
          value={kpis.pendingReceipts}
          trendType="up"
        />

        <KPICard
          title="Pending Deliveries"
          value={kpis.pendingDeliveries}
          trendType="up"
        />
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        {chartData && (
          <InventoryChart
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: 'top', labels: { color: 'white' } },
                title: { display: true, text: 'Inventory Trends', color: 'white' },
              },
              scales: {
                y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
              }
            }}
            className="h-80"
          />
        )}

        {/* Quick Stats / Occupancy */}
        <div className="bg-gray-800 p-6 rounded shadow text-white h-80 flex flex-col justify-center items-center">
             <h3 className="text-xl font-semibold mb-4">Warehouse Occupancy</h3>
             <div className="relative w-40 h-40 rounded-full border-8 border-gray-700 flex items-center justify-center">
                {/* Simple circular progress visualization */}
                <span className="text-3xl font-bold">{Math.round(kpis.occupancy)}%</span>
                <svg className="absolute top-0 left-0 w-full h-full transform -rotate-90" style={{ pointerEvents: 'none' }}>
                  <circle 
                    cx="50%" cy="50%" r="70" 
                    stroke="#3b82f6" strokeWidth="8" fill="transparent" 
                    strokeDasharray="440" 
                    strokeDashoffset={440 - (440 * kpis.occupancy) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
             </div>
             <p className="mt-4 text-gray-400 text-sm">Based on max capacity vs current stock</p>
        </div>
      </div>
    </main>
  );
}