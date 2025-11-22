import PropTypes from 'prop-types';

export default function StockLedger({ entries }) {
  return (
    <div className="bg-gray-800 rounded shadow p-4 overflow-x-auto text-white">
      <h2 className="text-xl font-semibold mb-4">Stock Ledger</h2>
      <table className="min-w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">Date</th>
            <th className="border border-gray-600 px-4 py-2">Product SKU</th>
            <th className="border border-gray-600 px-4 py-2">Adjustment Type</th>
            <th className="border border-gray-600 px-4 py-2">Quantity</th>
            <th className="border border-gray-600 px-4 py-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ id, date, productSKU, adjustmentType, quantity, reason }) => (
            <tr key={id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{date}</td>
              <td className="border border-gray-600 px-4 py-2">{productSKU}</td>
              <td className="border border-gray-600 px-4 py-2 capitalize">{adjustmentType}</td>
              <td className="border border-gray-600 px-4 py-2">{quantity}</td>
              <td className="border border-gray-600 px-4 py-2">{reason}</td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-400">
                No stock adjustment entries found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

StockLedger.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      date: PropTypes.string.isRequired,
      productSKU: PropTypes.string.isRequired,
      adjustmentType: PropTypes.oneOf(['increase', 'decrease']).isRequired,
      quantity: PropTypes.number.isRequired,
      reason: PropTypes.string.isRequired,
    })
  ).isRequired,
};
