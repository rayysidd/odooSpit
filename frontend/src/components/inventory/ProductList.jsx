import PropTypes from 'prop-types';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded shadow p-4 text-white overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-600 px-4 py-2 text-left">SKU</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Category</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Unit</th>
            <th className="border border-gray-600 px-4 py-2 text-left">Reorder Level</th>
            <th className="border border-gray-600 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, name, sku, category, unit, reorderLevel }) => (
            <tr key={id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{name}</td>
              <td className="border border-gray-600 px-4 py-2">{sku}</td>
              <td className="border border-gray-600 px-4 py-2">{category}</td>
              <td className="border border-gray-600 px-4 py-2">{unit}</td>
              <td className="border border-gray-600 px-4 py-2">{reorderLevel}</td>
              <td className="border border-gray-600 px-4 py-2 text-center space-x-2">
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => onEdit(id)}
                  aria-label={`Edit ${name}`}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
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
              <td colSpan="6" className="text-center py-4 text-gray-400">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      category: PropTypes.string,
      unit: PropTypes.string,
      reorderLevel: PropTypes.number,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
