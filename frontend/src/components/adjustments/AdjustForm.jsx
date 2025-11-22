import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AdjustForm({ onSubmit, loading = false }) {
  const [formValues, setFormValues] = useState({
    productSKU: '',
    adjustmentType: 'increase', // 'increase' or 'decrease'
    quantity: '',
    reason: '',
    adjustmentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow space-y-4 text-white">
      <h2 className="text-xl font-semibold mb-4">Stock Adjustment</h2>

      <div>
        <label htmlFor="productSKU" className="block mb-1 text-gray-300">Product SKU</label>
        <input
          type="text"
          id="productSKU"
          name="productSKU"
          value={formValues.productSKU}
          onChange={handleChange}
          required
          placeholder="Enter SKU"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="adjustmentType" className="block mb-1 text-gray-300">
          Adjustment Type
        </label>
        <select
          id="adjustmentType"
          name="adjustmentType"
          value={formValues.adjustmentType}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="increase">Increase</option>
          <option value="decrease">Decrease</option>
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block mb-1 text-gray-300">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formValues.quantity}
          onChange={handleChange}
          required
          min="1"
          placeholder="Enter quantity"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="reason" className="block mb-1 text-gray-300">Reason</label>
        <textarea
          id="reason"
          name="reason"
          value={formValues.reason}
          onChange={handleChange}
          placeholder="Enter reason for adjustment"
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
          required
        />
      </div>

      <div>
        <label htmlFor="adjustmentDate" className="block mb-1 text-gray-300">Adjustment Date</label>
        <input
          type="date"
          id="adjustmentDate"
          name="adjustmentDate"
          value={formValues.adjustmentDate}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Adjustment'}
      </button>
    </form>
  );
}

AdjustForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
