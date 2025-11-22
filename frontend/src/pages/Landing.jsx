import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-6 p-4">
      <h1 className="text-4xl font-bold">Welcome to StockMaster</h1>
      <p className="text-lg max-w-md text-center">
        Manage your inventory with ease. Please login or signup to continue.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
