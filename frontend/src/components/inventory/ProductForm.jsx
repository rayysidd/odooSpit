import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function ProductForm({ onSubmit, product = null, loading = false, onCancel }) {
  // Initialize state based on the 'product' prop (for editing) or empty strings (for new product)
  const [formValues, setFormValues] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || '',
    unit: product?.unit || '',
    reorderLevel: product?.reorderLevel || 0,
  });

  // Use a useEffect to reset form values whenever the 'product' prop changes.
  // This is crucial for switching between "Add New" (product is null) and "Edit" modes.
  useEffect(() => {
    setFormValues({
      name: product?.name || '',
      sku: product?.sku || '',
      category: product?.category || '',
      unit: product?.unit || '',
      // Ensure reorderLevel defaults to a number (0) for the number input type
      reorderLevel: product?.reorderLevel ?? 0, 
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Convert number inputs to actual numbers
    const newValue = type === 'number' ? parseFloat(value) : value;

    setFormValues((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  const isEditing = !!product;

  return (
    <div className="bg-white shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">
        {isEditing ? 'Edit Product Details' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Laptop Pro 15"
            />
          </div>

          {/* SKU Input */}
          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
              SKU Code
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formValues.sku}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., LPT-P15-SLV"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Input */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., Electronics"
            />
          </div>

          {/* Unit Input */}
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formValues.unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g., pcs, kg, boxes"
            />
          </div>

          {/* Reorder Level Input */}
          <div>
            <label htmlFor="reorderLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Reorder Level
            </label>
            <input
              type="number"
              id="reorderLevel"
              name="reorderLevel"
              value={formValues.reorderLevel}
              onChange={handleChange}
              min="0"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Minimum stock level"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex justify-end space-x-3">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditing ? 'Update Product' : 'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.object,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
};