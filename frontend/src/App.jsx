import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import {
  BrowserRouter as Router,
  useLocation,
  Navigate
} from 'react-router-dom';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import Sidebar from './components/navigation/Sidebar';
import Navbar from './components/navigation/Navbar';
import WarehouseSwitcher from './components/navigation/WarehouseSwitcher';

import { AuthProvider, useAuth } from './features/auth/AuthProvider';
import { InventoryProvider } from './features/inventory/InventoryProvider';
import { TransactionProvider } from './features/transactions/TransactionProvider';
import { UserProvider } from './features/user/UserProvider';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { user } = useAuth();

  // List of public paths where navbar/sidebar should be hidden
  const publicPaths = ['/', '/login', '/signup', '/password-reset'];

  const isPublic = publicPaths.includes(location.pathname);

  // Optionally redirect to dashboard if logged in and on landing/login/signup
  if (user && isPublic) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {!isPublic && user && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {!isPublic && user && <Navbar title="StockMaster" />}
        {!isPublic && user && (
          <div className="flex justify-between items-center px-6 py-2 bg-gray-800 border-b border-gray-700">
            <WarehouseSwitcher />
          </div>
        )}
        <main className="flex-1 overflow-auto bg-gray-900">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  // Provide your warehouse data and state to WarehouseSwitcher here if needed

  return (
    <Router>
      <ReduxProvider store={store}>
        <AuthProvider>
          <UserProvider>
            <InventoryProvider>
              <TransactionProvider>
                <LayoutWrapper>
                  <AppRoutes />
                </LayoutWrapper>
              </TransactionProvider>
            </InventoryProvider>
          </UserProvider>
        </AuthProvider>
      </ReduxProvider>
    </Router>
  );
}
