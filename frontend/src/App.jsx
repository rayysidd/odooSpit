import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store'; // Your Redux store (if using Redux)
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/navigation/Sidebar';
import Navbar from './components/navigation/Navbar';
import WarehouseSwitcher from './components/navigation/WarehouseSwitcher';

// Context providers (if using Context API instead of Redux)
import { AuthProvider } from './features/auth/AuthProvider';
import { InventoryProvider } from './features/inventory/InventoryProvider';
import { TransactionProvider } from './features/transactions/TransactionProvider';
import { UserProvider } from './features/user/UserProvider';

export default function App() {
  // Dummy warehouses for WarehouseSwitcher example
  const warehouses = [
    { id: 'wh1', name: 'Main Warehouse' },
    { id: 'wh2', name: 'Secondary Warehouse' },
  ];
  const [selectedWarehouse, setSelectedWarehouse] = React.useState(warehouses[0].id);

  return (
    <Router>
      <ReduxProvider store={store}>
        <AuthProvider>
          <UserProvider>
            <InventoryProvider>
              <TransactionProvider>
                <div className="flex h-screen bg-gray-900 text-white">
                  <Sidebar />

                  <div className="flex-1 flex flex-col">
                    <Navbar title="StockMaster" />

                    <div className="flex justify-between items-center px-6 py-2 bg-gray-800 border-b border-gray-700">
                      <WarehouseSwitcher
                        warehouses={warehouses}
                        selectedWarehouse={selectedWarehouse}
                        onChange={setSelectedWarehouse}
                      />
                      {/* You can add user info or notifications here */}
                    </div>

                    <main className="flex-1 overflow-auto bg-gray-900">
                      <AppRoutes />
                    </main>
                  </div>
                </div>
              </TransactionProvider>
            </InventoryProvider>
          </UserProvider>
        </AuthProvider>
      </ReduxProvider>
    </Router>
  );
}
