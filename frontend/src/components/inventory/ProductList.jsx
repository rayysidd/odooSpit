import PropTypes from 'prop-types';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="p-0">
      <h2 className="text-2xl font-bold **text-white** mb-4 **border-gray-700** border-b pb-3"> {/* CHANGE 7: White text, Darker border */}
        Current Inventory Stock
      </h2>
      <div className="overflow-x-auto shadow-sm rounded-xl **border-gray-700** border"> {/* CHANGE 8: Darker border */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="**bg-gray-800**"> {/* CHANGE 9: Darker header background */}
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium **text-gray-300** uppercase tracking-wider"> {/* CHANGE 10: Light header text */}
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium **text-gray-300** uppercase tracking-wider"> {/* CHANGE 10 */}
                SKU
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium **text-gray-300** uppercase tracking-wider"> {/* CHANGE 10 */}
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium **text-gray-300** uppercase tracking-wider"> {/* CHANGE 10 */}
                Unit
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium **text-gray-300** uppercase tracking-wider"> {/* CHANGE 10 */}
                Reorder Level
              </th>
              <th scope="col" className="relative px-6 py-3 text-center">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="**bg-gray-900 divide-gray-700** divide-y"> {/* CHANGE 11: Dark body background and divider */}
            {products.map(({ id, name, sku, category, unit, reorderLevel }) => (
              <tr key={id} className="**hover:bg-gray-700** transition duration-150 ease-in-out"> {/* CHANGE 12: Darker hover state */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium **text-white**">{name}</td> {/* CHANGE 13: White text */}
                <td className="px-6 py-4 whitespace-nowrap text-sm **text-gray-300**">{sku}</td> {/* CHANGE 14: Light body text */}
                <td className="px-6 py-4 whitespace-nowrap text-sm **text-gray-300**">{category || 'N/A'}</td> {/* CHANGE 14 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm **text-gray-300**">{unit || 'N/A'}</td> {/* CHANGE 14 */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reorderLevel < 10 ? 'bg-red-700 text-white' : 'bg-green-700 text-white' // CHANGED: Made indicator backgrounds stronger (optional)
                    }`}>
                        {reorderLevel}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    className="text-indigo-400 hover:text-indigo-300 transition duration-150 ease-in-out" // CHANGE 15: Lighter indigo for dark theme
                    onClick={() => onEdit(id)}
                    aria-label={`Edit ${name}`}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300 transition duration-150 ease-in-out" // CHANGE 15: Lighter red for dark theme
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
                <td colSpan="6" className="text-center py-10 **text-gray-400** italic text-lg"> {/* CHANGE 16: Light gray text */}
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
// ... (propTypes are unchanged) ...
};
