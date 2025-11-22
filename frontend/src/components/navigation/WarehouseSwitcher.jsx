import PropTypes from 'prop-types';

export default function WarehouseSwitcher({
  warehouses = [],
  selectedWarehouse,
  onChange,
}) {
  return (
    <div className="text-white">
      <label htmlFor="warehouse-select" className="mr-2 font-medium">
        Warehouse:
      </label>
      <select
        id="warehouse-select"
        value={selectedWarehouse}
        onChange={(e) => onChange(e.target.value)}
        className="bg-gray-700 rounded p-1 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {warehouses.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

WarehouseSwitcher.propTypes = {
  warehouses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedWarehouse: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
