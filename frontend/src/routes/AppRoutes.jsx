import { Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Page imports
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Receipts from '../pages/Receipts';
import Deliveries from '../pages/Deliveries';
import Transfers from '../pages/Transfers';
import Adjustments from '../pages/Adjustments';
import Profile from '../pages/Profile';
import Login from '../components/auth/LoginForm';
import Signup from '../components/auth/SignupForm';
import OTPReset from '../components/auth/OTPReset';

// PublicRoute component to redirect logged-in users away from auth/landing pages
function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

// PrivateRoute component to protect private pages and redirect unauthenticated users to login
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing page at root accessible to unauthenticated users */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        } 
      />

      {/* Authentication routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      />
      <Route 
        path="/password-reset" 
        element={
          <PublicRoute>
            <OTPReset />
          </PublicRoute>
        } 
      />

      {/* Protected application routes */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/products" 
        element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/receipts" 
        element={
          <PrivateRoute>
            <Receipts />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/deliveries" 
        element={
          <PrivateRoute>
            <Deliveries />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/transfers" 
        element={
          <PrivateRoute>
            <Transfers />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/adjustments" 
        element={
          <PrivateRoute>
            <Adjustments />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } 
      />

      {/* Fallback 404 route */}
      <Route 
        path="*" 
        element={<h1 className="p-6 text-center text-white">404 - Page not found</h1>} 
      />
    </Routes>
  );
}

export default AppRoutes;
