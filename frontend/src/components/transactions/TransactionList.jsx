import PropTypes from 'prop-types';

export default function TransactionList({ transactions, type, onEdit, onDelete }) {
  const titleMap = {
    receipt: 'Receipts',
    delivery: 'Deliveries',
    transfer: 'Internal Transfers',
  };

  return (
    <div className="bg-gray-800 rounded shadow p-4 text-white overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">{titleMap[type]}</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 px-4 py-2">Product SKU</th>
            <th className="border border-gray-600 px-4 py-2">Quantity</th>
            {type === 'transfer' && (
              <>
                <th className="border border-gray-600 px-4 py-2">From Location</th>
                <th className="border border-gray-600 px-4 py-2">To Location</th>
              </>
            )}
            {(type === 'receipt' || type === 'delivery') && (
              <th className="border border-gray-600 px-4 py-2">Location</th>
            )}
            <th className="border border-gray-600 px-4 py-2">Date</th>
            <th className="border border-gray-600 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-700">
              <td className="border border-gray-600 px-4 py-2">{t.productSKU}</td>
              <td className="border border-gray-600 px-4 py-2">{t.quantity}</td>
              {type === 'transfer' && (
                <>
                  <td className="border border-gray-600 px-4 py-2">{t.fromLocation}</td>
                  <td className="border border-gray-600 px-4 py-2">{t.toLocation}</td>
                </>
              )}
              {(type === 'receipt' || type === 'delivery') && (
                <td className="border border-gray-600 px-4 py-2">
                  {type === 'receipt' ? t.warehouseLocation : t.deliveryLocation}
                </td>
              )}
              <td className="border border-gray-600 px-4 py-2">{t.date}</td>
              <td className="border border-gray-600 px-4 py-2 text-center space-x-2">
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => onEdit(t.id)}
                  aria-label={`Edit transaction ${t.id}`}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDelete(t.id)}
                  aria-label={`Delete transaction ${t.id}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={type === 'transfer' ? '7' : '6'} className="text-center py-4 text-gray-400">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['receipt', 'delivery', 'transfer']).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
