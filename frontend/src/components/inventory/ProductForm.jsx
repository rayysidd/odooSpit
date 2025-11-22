import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductForm({ onSubmit, product = {}, loading = false }) {
  const [formValues, setFormValues] = useState({
    name: product.name || '',
    sku: product.sku || '',
    category: product.category || '',
    unit: product.unit || '',
    reorderLevel: product.reorderLevel || '',
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
      <h2 className="text-xl font-semibold text-white">Product Details</h2>

      <div>
        <label htmlFor="name" className="block text-gray-300 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Product Name"
        />
      </div>

      <div>
        <label htmlFor="sku" className="block text-gray-300 mb-1">
          SKU Code
        </label>
        <input
          type="text"
          id="sku"
          name="sku"
          value={formValues.sku}
          onChange={handleChange}
          required
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="SKU Code"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-gray-300 mb-1">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formValues.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Category"
        />
      </div>

      <div>
        <label htmlFor="unit" className="block text-gray-300 mb-1">
          Unit
        </label>
        <input
          type="text"
          id="unit"
          name="unit"
          value={formValues.unit}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Unit of measurement"
        />
      </div>

      <div>
        <label htmlFor="reorderLevel" className="block text-gray-300 mb-1">
          Reorder Level
        </label>
        <input
          type="number"
          id="reorderLevel"
          name="reorderLevel"
          value={formValues.reorderLevel}
          onChange={handleChange}
          min="0"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Minimum stock level before reorder"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.object,
  loading: PropTypes.bool,
};
