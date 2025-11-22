import PropTypes from 'prop-types';

export default function DashboardFilter({ filters, onChange, className = '' }) {
  return (
    <div className={`flex flex-wrap items-center space-x-4 p-4 bg-gray-800 rounded shadow ${className}`}>
      {filters.map(({ label, name, type, options, value }) => (
        <div key={name} className="flex flex-col mb-2 min-w-[150px]">
          <label htmlFor={name} className="text-xs text-gray-400 mb-1">
            {label}
          </label>

          {type === 'select' && (
            <select
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              className="px-3 py-1.5 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          {type === 'text' && (
            <input
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
              className="px-3 py-1.5 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Filter by ${label.toLowerCase()}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

DashboardFilter.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['select', 'text']).isRequired,
      options: PropTypes.array,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
