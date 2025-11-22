import { useState } from 'react';
import PropTypes from 'prop-types';

export default function OTPReset({ onRequestOTP, onVerifyOTP, loading = false, error }) {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState(1);

  const handleRequestOTP = (e) => {
    e.preventDefault();
    onRequestOTP(email);
    setStep(2);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    onVerifyOTP(otp);
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow max-w-sm mx-auto text-white">
      {step === 1 && (
        <form onSubmit={handleRequestOTP} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Request OTP</h2>
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
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
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
