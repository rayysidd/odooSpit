import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DeliveryForm({ onSubmit, loading = false }) {
  const [formValues, setFormValues] = useState({
    productSKU: '',
    quantity: '',
    deliveryLocation: '',
    deliveryDate: '',
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
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Add Delivery</h2>

      <div>
        <label htmlFor="productSKU" className="block mb-1 text-gray-300">Product SKU</label>
        <input
          type="text"
          id="productSKU"
          name="productSKU"
          value={formValues.productSKU}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter SKU code"
        />
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
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quantity"
        />
      </div>

      <div>
        <label htmlFor="deliveryLocation" className="block mb-1 text-gray-300">Delivery Location</label>
        <input
          type="text"
          id="deliveryLocation"
          name="deliveryLocation"
          value={formValues.deliveryLocation}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter location"
        />
      </div>

      <div>
        <label htmlFor="deliveryDate" className="block mb-1 text-gray-300">Delivery Date</label>
        <input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={formValues.deliveryDate}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Add Delivery'}
      </button>
    </form>
  );
}

DeliveryForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
