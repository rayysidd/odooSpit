import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left Side - Brand */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-gray-800">
        <h1 className="text-5xl font-extrabold">StockMaster</h1>
      </div>

      {/* Right Side - Auth Actions */}
      <div className="w-1/2 flex flex-col items-center justify-center gap-6 p-10">
        <h2 className="text-3xl font-semibold">Welcome to StockMaster</h2>
        <p className="text-gray-300 max-w-sm text-center">
          Digitize and streamline all stock-related operations with ease.
        </p>

        <div className="flex space-x-6">
          <Link
            to="/signup"
            className="px-8 py-3 bg-blue-600 rounded font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border border-blue-600 rounded font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
