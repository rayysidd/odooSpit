import PropTypes from 'prop-types';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="p-0 bg-gray-800 rounded-xl border border-gray-700">
      <h2 className="text-2xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-3">
        Current Inventory Stock
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-xl">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Unit
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Reorder Level
              </th>
              <th scope="col" className="relative px-6 py-3 text-center">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {products.map(({ id, name, sku, category, unit, reorderLevel }) => (
              <tr key={id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sku}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{category || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{unit || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    reorderLevel < 10 ? 'bg-red-700 text-white' : 'bg-green-700 text-white'
                  }`}>
                    {reorderLevel}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out"
                    onClick={() => onEdit(id)}
                    aria-label={`Edit ${name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 transition duration-150 ease-in-out"
                    onClick={() => onDelete(id)}
                    aria-label={`Delete ${name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400 italic text-lg">
                  No products found. Add a new product above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
