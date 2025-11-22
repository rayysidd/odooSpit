import PropTypes from 'prop-types';

export default function KPICard({ title, value, icon: Icon, trend, trendType = 'up', className = '' }) {
  return (
    <div className={`bg-gray-800 text-white p-4 rounded shadow flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-4">
        {Icon && <Icon className="h-10 w-10 text-blue-400" aria-hidden="true" />}
        <div>
          <p className="text-sm font-medium uppercase text-gray-400">{title}</p>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center text-sm font-semibold ${trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trendType === 'up' ? '▲' : '▼'} {trend}%
        </div>
      )}
    </div>
  );
}

KPICard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  trend: PropTypes.number,
  trendType: PropTypes.oneOf(['up', 'down']),
  className: PropTypes.string,
};
