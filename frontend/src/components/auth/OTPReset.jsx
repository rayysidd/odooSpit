import { useState } from 'react';
import PropTypes from 'prop-types';

export default function OTPReset({ onRequestOTP, onVerifyOTP, loading = false, error }) {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState(''); // Added State
  const [step, setStep] = useState(1);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    // Pass email to parent action
    await onRequestOTP(email);
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Send all 3 required fields
    onVerifyOTP({ email, otp, newPassword });
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow max-w-sm mx-auto text-white mt-10">
      {step === 1 && (
        <form onSubmit={handleRequestOTP} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>
          <p className="text-gray-400 text-sm text-center">Enter your email to receive a verification code.</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Code'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Set New Password</h2>
          <p className="text-gray-400 text-sm text-center">Check your email for the code.</p>
          
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {/* ADDED PASSWORD FIELD */}
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-semibold transition disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Confirm Reset'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      )}
    </div>
  );
}

OTPReset.propTypes = {
  onRequestOTP: PropTypes.func.isRequired,
  onVerifyOTP: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};